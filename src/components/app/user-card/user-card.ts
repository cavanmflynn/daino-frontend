import { Component, Vue } from 'vue-property-decorator';
import { UserCardBody } from './user-card-body';
import { UserCardHeader } from './user-card-header';
import WithRender from './user-card.html';

@WithRender
@Component({
  components: {
    UserCardHeader,
    UserCardBody,
  },
})
export class UserCard extends Vue {}
