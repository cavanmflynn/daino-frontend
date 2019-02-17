import { Component, Vue } from 'vue-property-decorator';
import WithRender from './landing.html';

@WithRender
@Component
export default class Landing extends Vue {}
