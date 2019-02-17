import { dainosaur } from '@/api';
import { firebaseApi } from '@/api/firebase-api';
import { system } from '@/store';
import { AuthType, Website } from '@/types';
import firebase, { User } from 'firebase';
import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './auth-card.html';

@WithRender
@Component
export class AuthCard extends Vue {
  @Prop()
  private type: AuthType;

  get headingKey() {
    return this.isLogin() ? 'LOGIN_HEADING' : 'SIGN_UP_HEADING';
  }

  get twitterButtonKey() {
    return this.isLogin() ? 'LOGIN_WITH_TWITTER' : 'SIGN_UP_WITH_TWITTER';
  }

  get githubButtonKey() {
    return this.isLogin() ? 'LOGIN_WITH_GITHUB' : 'SIGN_UP_WITH_GITHUB';
  }

  /**
   * Determine if we're on the login screen
   */
  isLogin() {
    return this.type === AuthType.LOGIN;
  }

  /**
   * Authenticate a user with Twitter
   */
  async authenticateWithTwitter() {
    const provider = new firebase.auth.TwitterAuthProvider();
    try {
      const authResult = await firebase.auth().signInWithPopup(provider);
      if (authResult.credential && authResult.user) {
        const { accessToken, secret } = authResult.credential as any;
        const result = await dainosaur.createOrFindUserWithToken(
          Website.TWITTER,
          accessToken,
          secret,
        );
        system.setUser({
          ...result.user,
          imageSrc: authResult.user.photoURL as string,
        });
        this.pollForBalanceUpdates(Website.TWITTER, result.user.username);
        // Never do this in production
        localStorage.setItem('access-token', accessToken);
        localStorage.setItem('secret-token', secret);
        this.$router.replace('user');
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Authenticate a user with Github
   */
  async authenticateWithGithub() {
    const provider = new firebase.auth.GithubAuthProvider();
    try {
      const authResult = await firebase.auth().signInWithPopup(provider);
      if (authResult.credential && authResult.user) {
        const { accessToken } = authResult.credential as any;
        const result = await dainosaur.createOrFindUserWithToken(
          Website.GITHUB,
          accessToken,
        );
        system.setUser({
          ...result.user,
          imageSrc: authResult.user.photoURL as string,
        });
        this.pollForBalanceUpdates(Website.GITHUB, result.user.username);
        // Never do this in production
        localStorage.setItem('access-token', accessToken);
        this.$router.replace('user');
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Poll for updated user balances
   */
  async pollForBalanceUpdates(website: Website, username: string) {
    setInterval(async () => {
      const balance = await firebaseApi.getBalance(website, username);
      system.setUser({
        ...(system.activeUser as any),
        balance,
      });
    }, 5000);
  }
}
