import { system } from '@/store';
import { Component, Vue } from 'vue-property-decorator';
import VueQRCode from 'vue-qrcode-component';
import WithRender from './your-daino.html';

@WithRender
@Component({
  components: {
    VueQRCode,
  },
})
export class YourDaino extends Vue {
  private copyButtonText: string;
  private copiedTimeout: number;

  data() {
    return {
      copyButtonText: 'Copy Address',
      copiedTimeout: undefined,
    };
  }

  get address() {
    if (!system.activeUser) {
      return '';
    }
    return system.activeUser.address;
  }

  get profileMode() {
    return system.profileMode;
  }

  get balance() {
    return system.activeUser && system.activeUser.balance;
  }

  /**
   * Notify the user by updating the button text on copy
   */
  updateCopyButtonText() {
    // Clear previous timeout if necessary
    if (this.copiedTimeout) {
      clearTimeout(this.copiedTimeout);
    }

    // Notify the user
    this.copyButtonText = 'Address Copied';
    this.copiedTimeout = setTimeout(() => {
      this.copyButtonText = 'Copy Address';
    }, 2000);
  }
}
