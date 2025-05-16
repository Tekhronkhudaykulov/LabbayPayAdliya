import { API_URL } from "../config";
import i18n from "../../i18n";

import axios from "axios";

export const $api = axios.create({
  baseURL: API_URL,
});

$api.defaults.headers.common["Accept"] = "application/json";

export const initApp = () => {};

// Language
$api.interceptors.request.use((config) => {
  config.headers["Accept-Language"] = i18n.language.toLowerCase();
  return config;
});

export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  $api.defaults.headers.common["Accept-Language"] = lng;
};
