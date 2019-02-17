import { dainosaur } from '@/api';
import { firebaseApi } from '@/api/firebase-api';
import { system } from '@/store';
import { UserTab, Website } from '@/types';
import { Component, Vue } from 'vue-property-decorator';
import WithRender from './user-card-header.html';

@WithRender
@Component
export class UserCardHeader extends Vue {
  async mounted() {
    if (this.$route.hash.includes('profile')) {
      system.setProfileMode(true);
      system.setTab(UserTab.YOUR_DAINO);
      const username = this.$route.hash.split('-').pop() as string;
      // Github injection is not supported quite yet
      const res = await dainosaur.createOrFindUserWithUsername(
        Website.TWITTER,
        username,
      );
      this.pollForBalanceUpdates(Website.TWITTER, username);
      system.setUser({
        ...res.user,
        username,
      });
    }
  }

  get profileMode() {
    return system.profileMode;
  }

  get activeTab() {
    return system.activeTab;
  }

  get username() {
    return system.activeUser && system.activeUser.username;
  }

  get imageSrc() {
    if (system.activeUser && system.activeUser.imageSrc) {
      return system.activeUser.imageSrc;
    }
    return 'https://user-images.githubusercontent.com/20102664/52915729-b5505480-3294-11e9-927b-a55b50be2d19.png';
  }

  setActiveTab(tab: UserTab) {
    system.setTab(tab);
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
