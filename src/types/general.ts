import { lang } from '@/localization';

export type TranslationKey = keyof typeof lang['en'];

export interface TranslationSubstitutions {
  [key: string]: string;
}

export interface User {
  address: string;
  username: string;
  balance: number;
  hasLoggedIn: boolean;
  imageSrc: string;
}
