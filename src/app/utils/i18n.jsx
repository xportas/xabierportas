import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import EN from '../../../public/locales/en/strings.json';
import ES from '../../../public/locales/es/strings.json';
import GAL from '../../../public/locales/gal/strings.json';
import PT from '../../../public/locales/pt/strings.json';

const resources = {
  es: { strings: ES },
  "es-ES": { strings: ES },
  en: { strings: EN },
  pt: { strings: PT },
  gl: { strings: GAL },
  gal: { strings: GAL },
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    debug: false,
    fallbackLng: 'en',
  });

export default i18next;