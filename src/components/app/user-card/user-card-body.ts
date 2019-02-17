import { system } from '@/store';
import { UserTab } from '@/types';
import { Component, Vue } from 'vue-property-decorator';
import { Dashboard } from './dashboard';
import WithRender from './user-card-body.html';
import { YourDaino } from './your-daino';

@WithRender
@Component({
  components: {
    Dashboard,
    YourDaino,
  },
})
export class UserCardBody extends Vue {
  get dashboardIsActive() {
    return system.activeTab === UserTab.DASHBOARD;
  }
}
