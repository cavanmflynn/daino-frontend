import { AuthCard } from '@/components/app/auth-card';
import { Component, Vue } from 'vue-property-decorator';
import WithRender from './login.html';

@WithRender
@Component({
  components: {
    AuthCard,
  },
})
export default class Login extends Vue {}
