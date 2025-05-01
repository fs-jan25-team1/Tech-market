import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import ua from '../locales/ua.json';

const resources = {
  en: {
    translation: en,
  },
  ua: {
    translation: ua,
  },
};

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    lng: 'ua', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    compatibilityJSON: 'v4'
  });

export default i18n;