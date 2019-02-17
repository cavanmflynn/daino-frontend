import { AuthCard } from '@/components/app/auth-card';
import { Component, Vue } from 'vue-property-decorator';
import WithRender from './signup.html';

@WithRender
@Component({
  components: {
    AuthCard,
  },
})
export default class SignUp extends Vue {}
