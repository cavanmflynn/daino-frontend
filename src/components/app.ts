import { dainosaur } from '@/api';
import { firebaseApi } from '@/api/firebase-api';
import { system } from '@/store';
import { User, Website } from '@/types';
import firebase, { UserInfo } from 'firebase';
import { Component, Vue } from 'vue-property-decorator';
import '../scss/main.scss';
import WithRender from './app.html';
import { PageSkeleton } from './layout/page-skeleton';

@WithRender
@Component({
  components: {
    PageSkeleton,
  },
})
export default class App extends Vue {
  async mounted() {
    const currentUser = firebase.auth().currentUser;
    if (currentUser && !system.activeUser) {
      const website =
        (currentUser.providerData[0] as UserInfo).providerId === 'github.com'
          ? Website.GITHUB
          : Website.TWITTER;
      const result = await dainosaur.createOrFindUserWithToken(
        website,
        localStorage.getItem('access-token') as string,
        localStorage.getItem('secret-token') as string,
      );
      system.setUser({
        ...result.user,
        imageSrc: currentUser.photoURL as string,
      });
    }
  }
}
