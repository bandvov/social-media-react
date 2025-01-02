import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      email: 'Email',
      password: 'Password',
      login: 'Login',
      registration: 'Registration',
      submit: "submit"
    },
  },
  ua: {
    translation: {
      email: 'email',
      password: 'пароль',
      login: 'Увійти',
      registration: 'Реєстрація',
      submit: "відправити"
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
