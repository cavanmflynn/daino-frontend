import { system } from '@/store';
import { Component, Vue } from 'vue-property-decorator';
import WithRender from './balance.html';

@WithRender
@Component
export class Balance extends Vue {
  get balance() {
    return system.activeUser && system.activeUser.balance;
  }
}
