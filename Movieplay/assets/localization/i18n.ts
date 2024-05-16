import i18next from 'i18next';
import es from './translations/es.json';
import en from './translations/en.json';
import {initReactI18next} from 'react-i18next';

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

const i18n = i18next.createInstance();

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  returnNull: false,
  resources,
  lng: 'es',
  fallbackLng: 'en',
});
export default i18n;
