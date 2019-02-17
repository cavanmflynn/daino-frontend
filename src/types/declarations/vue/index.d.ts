import { Website } from '@/types/constants';

declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface Vue {
    $auth: {
      authenticate(website: Website);
    };
  }
}
