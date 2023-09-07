import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translations: {
        "Sign Up": "Sign Up",
        "Password mismatch": "Password mismatch",
        Username: "Username",
        "Display Name": "Display Name",
        Password: "Parsword",
        "Password Repeat": "Password Repeat",
        Login: "Login",
      },
    },
    tr: {
      translations: {
        "Sign Up": "Kayıt ol",
        "Password mismatch": " Şifreler Eşleşmiyor",
        Username: "Kullanıcı Adı",
        "Display Name": "Tercih Edilen İsim",
        Password: "Şifre",
        "Password Repeat": "Şifre Tekrar",
        Login: "Giriş Yap",
      },
    },
  },
  fallbackLng: "tr",
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeperator: ",",
  },
  react: {
    wait: true,
  },
});

export default i18next;
