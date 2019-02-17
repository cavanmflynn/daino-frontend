import { Component, Vue } from 'vue-property-decorator';
import WithRender from './tx-history.html';

@WithRender
@Component
export class TxHistory extends Vue {}
