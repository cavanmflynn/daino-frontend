import { Component, Vue } from 'vue-property-decorator';
import { Balance } from './balance';
import { CashOut } from './cash-out';
import WithRender from './dashboard.html';
import { TxHistory } from './tx-history';

@WithRender
@Component({
  components: {
    Balance,
    TxHistory,
    CashOut,
  },
})
export class Dashboard extends Vue {}
