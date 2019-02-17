import { UserCard } from '@/components/app/user-card';
import { Component, Vue } from 'vue-property-decorator';
import WithRender from './user.html';

@WithRender
@Component({
  components: {
    UserCard,
  },
})
export default class User extends Vue {}
