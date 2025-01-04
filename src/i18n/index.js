import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      homePage: "Home",
      myPosts: "My Posts",
      profile: "Profile",
      email: "Email",
      password: "Password",
      login: "Login",
      signup: "Sign Up",
      submit: "submit",
      haveAccount: "Have account?",
      dontHaveAccount: "Don't have account?",
    },
  },
  ua: {
    translation: {
      homePage: "Головна",
      myPosts: "Мої пости",
      profile: "Профіль",
      email: "Email",
      password: "Пароль",
      login: "Увійти",
      signup: "Реєстрація",
      submit: "відправити",
      haveAccount: "Маєте акаунт?",
      dontHaveAccount: "Не маєте акаунта?",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
