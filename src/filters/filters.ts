import { activeLang, lang } from '@/localization';
import { TranslationKey, TranslationSubstitutions } from '@/types';
import Vue from 'vue';

/**
 * Retrieve and format the translation for the specified translation key
 */
Vue.filter(
  'translate',
  (
    translationKey: TranslationKey,
    substitutions: TranslationSubstitutions = {},
  ) => {
    if (!translationKey) return '';

    let message = lang[activeLang][translationKey];
    for (const [target, substitution] of Object.entries(substitutions)) {
      message = message.replace(`%${target}`, substitution);
    }
    return message;
  },
);
