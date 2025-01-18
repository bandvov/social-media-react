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
      login: "Log in",
      logout: "Log out",
      signup: "Sign Up",
      submit: "submit",
      haveAccount: "Have account?",
      dontHaveAccount: "Don't have account?",
      addReaction: "Add reaction",
      addComment: "Add Comment",
      repost: "Repost",
      removePost: "Remove",
      follow: "Follow",
      unfollow: "Unfollow",
      following: "Following",
      follows: "Follows me",
      createPost: "Create a New Post",
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
      logout: "Вийти",
      signup: "Реєстрація",
      submit: "відправити",
      haveAccount: "Маєте акаунт?",
      dontHaveAccount: "Не маєте акаунта?",
      addReaction: "Додати реакцію",
      addComment: "Коментувати",
      repost: "Репост",
      removePost: "Видалити",
      follow: "Підписатися",
      unfollow: "Відписатися",
      following: "Підписаний",
      follows: "Підписаний на мене",
      createPost: "Створити пост",
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
