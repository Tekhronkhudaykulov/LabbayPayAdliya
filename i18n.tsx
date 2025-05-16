import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import uzJson from "./src/i18/uz/translation.json";
import ruJson from "./src/i18/ru/translation.json";
import enJson from "./src/i18/en/translation.json";

i18n.use(initReactI18next).init({
  lng: "ru",
  fallbackLng: "en",
  resources: {
    uz: {
      translation: uzJson,
    },
    ru: {
      translation: ruJson,
    },
    en: {
      translation: enJson,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
