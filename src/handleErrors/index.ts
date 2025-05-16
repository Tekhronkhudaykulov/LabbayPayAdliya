import { message } from "antd";
import { APP_ROUTES } from "../router";
import { ErrorResponseType, RequestTimeoutErrorType } from "../types";
import i18n from "../../i18n";
import axios from "axios";

export const ERRORS = {
    username: i18n.t("empty_username"),
    password: i18n.t("empty_password"),
    phone: i18n.t('empty_phone'),
    code: i18n.t("empty_code"),
    timeot_error: i18n.t("timeout_error")
}

export const updateErrorsLanguage = () => {
    ERRORS.username = i18n.t("empty_username");
    ERRORS.password = i18n.t("empty_password");
    ERRORS.phone = i18n.t("empty_phone");
    ERRORS.code = i18n.t("empty_code");
    ERRORS.timeot_error = i18n.t("timeout_error")
  }

export const HELPER_TEXTS = {
    loading: i18n.t("loading"),
    login_again: i18n.t("login_again")
}

export const updateHelperTexts = () => {
    HELPER_TEXTS.loading = i18n.t("loading");
    HELPER_TEXTS.login_again = i18n.t("login_again");
}

i18n.on("languageChanged", () => {
    updateErrorsLanguage()
    updateHelperTexts()
})

export const logoutOn401Error = (error: ErrorResponseType) => {
    if (error?.response?.data?.authError) {
        message.loading({ content: `${HELPER_TEXTS.loading}...`, duration: 2 })
        setTimeout(() => {
            message.error({ content: HELPER_TEXTS.login_again, duration: 3 })
        }, 2000)
        setTimeout(() => {
            window.location.href = APP_ROUTES.HOME
        },5000)
    }
};

export const logoutOn401ClientError = (error: ErrorResponseType) => {
    if (error?.response?.status === 401) {
        message.loading({ content: `${HELPER_TEXTS.loading}...`, duration: 2 })
        setTimeout(() => {
            message.error({ content: HELPER_TEXTS.login_again, duration: 3 })
        }, 2000)
        setTimeout(() => {
        },5000)
    }
};

export const requestTimeoutError = (error: RequestTimeoutErrorType, errorMessage: string) => {
    if (axios.isAxiosError(error) && error.code === "ECONNABORTED") {
        message.error({
            content: errorMessage,
          });
    }
};