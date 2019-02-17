import en from './languages/en.temp.json';

export const lang = {
  en: { ...en },
};

// Default to english until localization process is started
export const activeLang = 'en';
