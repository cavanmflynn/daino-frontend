import firebase from 'firebase';
import { Component, Vue } from 'vue-property-decorator';
import WithRender from './page-skeleton.html';

@WithRender
@Component
export class PageSkeleton extends Vue {
  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.$router.replace('/');
      });
  }
}
