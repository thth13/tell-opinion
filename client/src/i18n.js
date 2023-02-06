import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import i18n from "i18next";
import {initReactI18next} from "react-i18next";

i18n.use(initReactI18next).use(LanguageDetector).use(Backend).init({
    fallbackLng: "en",
    detection: {
      order: ['localStorage', 'cookie'],
      cache: ['localStorage', 'cookie']
    },
    interpolation: {
      escapeValue: false
    }
  });