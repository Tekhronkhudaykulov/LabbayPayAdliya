import { API_URL } from "../config";
import {
  ConfirmPayerParamsType,
  LoginClientParamsType,
  LoginPayerParamsType,
  LogoutPayerParamsType,
  VendorsByCategoryParamsType,
  VendorFormParamsType,
  MainPageSearchType,
} from "../types";
import { $api } from "./api";

const $1min = 60000;

export const requests = {
  // CLIENT AUTH
  postLoginClient: (params: LoginClientParamsType) =>
    $api.post(`${API_URL}/login`, params),
  fetchClient: () => $api.get(`${API_URL}/me`),
  postLogoutClient: () => $api.post(`${API_URL}/logout`),
  // PAYER AUTH
  postLoginPayer: (params: LoginPayerParamsType) =>
    $api.post(`${API_URL}/payer-auth/login`, params, {
      timeout: $1min,
    }),
  postConfirmPayer: (params: ConfirmPayerParamsType) =>
    $api.post(`${API_URL}/payer-auth/confirm`, params),
  postLogoutPayer: (params: LogoutPayerParamsType) =>
    $api.post(`${API_URL}/payer-auth/logout`, params),
  // CLIENT
  fetchMainPage: () => $api.get(`${API_URL}/main-page`),
  fetchMainPageSearch: (params: MainPageSearchType) =>
    $api.post(`${API_URL}/main-page/search`, params),
  postVendorsByCategory: (params: VendorsByCategoryParamsType) =>
    $api.post(`${API_URL}/vendor-list-by-category-id`, params),
  fetchVendorForm: (params: VendorFormParamsType) =>
    $api.post(`${API_URL}/vendor-form`, params, { timeout: $1min }),
  fetchVendorInfo: (params: any) =>
    $api.post(`${API_URL}/pay/info`, params, { timeout: $1min }),
  postPrepareCard: (params: any) =>
    $api.post(`${API_URL}/pay/prepare-card`, params),
  postConfirmCard: (params: any) =>
    $api.post(`${API_URL}/pay/confirm-card`, params),
  // CASH
  postPrepareCash: (params: any) =>
    $api.post(`${API_URL}/pay/prepare-cash`, params),
  postConfirmCash: (params: any) =>
    $api.post(`${API_URL}/pay/confirm-cash`, params),
};
