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
      this.pollForBalanceUpdates(Website.TWITTER, res.user.username);
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
    if (system.activeUser) {
      return (
        system.activeUser.imageSrc ||
        `https://twitter.com/${
          system.activeUser.username
        }/profile_image?size=bigger`
      );
    }
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
