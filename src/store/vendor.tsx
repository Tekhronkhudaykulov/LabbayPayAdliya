import { SetState, create } from "zustand";
import { devtools } from "zustand/middleware";
import { requests } from "../helpers/requests";
import {
  CategoryType,
  MainType,
  VendorFormParamsType,
  VendorsByCategoryParamsType,
  VendorFormType,
  VendorType,
  CheckType,
  MainPageSearchType,
} from "../types";
import { message } from "antd";
import {
  ERRORS,
  logoutOn401ClientError,
  logoutOn401Error,
  requestTimeoutError,
} from "../handleErrors";

interface StateAction {
  vendorStep: number;
  main: MainType;
  mainSearchList: VendorType[];
  vendorsByCategoryId: CategoryType;
  vendorForm: { forms?: VendorFormType[]; vendorInfo?: VendorType };
  vendorFormParams?: any;
  vendorInfo: any;
  payStep: number;
  check?: CheckType;
  mainLoading: boolean;
  vendorsByCategoryIdLoading: boolean;
  globalLoading: boolean;
  loginLoading: boolean;
  logoutLoading: boolean;
  setVendorStep: () => void;
  setPayStep: () => void;
  getMain: () => Promise<any>;
  getMainSearch: () => Promise<any>;
  getVendorsByCategoryId: (params: VendorsByCategoryParamsType) => Promise<any>;
  getVendorForm: (params: VendorFormParamsType) => Promise<any>;
  setVendorFormParams: (params: any) => void;
  getVendorInfo: (params: any) => Promise<any>;
  prepareCard: (params: any) => Promise<any>;
  confirmCard: (params: any) => Promise<any>;
  prepareCash: (params: any) => Promise<any>;
  confirmCash: (params: any) => Promise<any>;
  setCheck: (check: CheckType) => void;
  clearState: () => void;
}

const initialState: StateAction = {
  vendorStep: 1,
  main: {},
  mainSearchList: [],
  vendorsByCategoryId: {},
  vendorForm: {},
  vendorFormParams: {},
  vendorInfo: null,
  check: {},
  payStep: 1,
  mainLoading: false,
  vendorsByCategoryIdLoading: false,
  globalLoading: false,
  loginLoading: false,
  logoutLoading: false,
  setVendorStep: () => {},
  setPayStep: () => {},
  getMain: async () => {},
  getMainSearch: async () => {},
  getVendorsByCategoryId: async () => {},
  getVendorForm: async () => {},
  setVendorFormParams: () => {},
  getVendorInfo: async () => {},
  prepareCard: async () => {},
  confirmCard: async () => {},
  prepareCash: async () => {},
  confirmCash: async () => {},
  setCheck: () => {},
  clearState: () => {},
};

const vendorStore = create(
  devtools((set: SetState<StateAction>) => ({
    ...initialState,
    setVendorStep: (step: number) => {
      set({ vendorStep: step });
    },
    getMain: async () => {
      set({ mainLoading: true });
      try {
        const { data }: any = await requests.fetchMainPage();
        set({ main: data?.data });
        return data;
      } catch (err: any) {
        logoutOn401ClientError(err);
        return err;
      } finally {
        set({ mainLoading: false });
      }
    },
    getMainSearch: async (params: MainPageSearchType) => {
      set({ mainLoading: true });
      try {
        const { data } = await requests.fetchMainPageSearch(params);
        set((state) => ({
          main: {
            ...state.main,
            main: data?.data,
            categories: state.main.categories,
            supportPhone: state.main.supportPhone,
            telegramLink: state.main.telegramLink,
            version: state.main.version,
          },
        }));
        return data;
      } catch (err) {
        return err;
      } finally {
        set({ mainLoading: false });
      }
    },
    getVendorsByCategoryId: async (params: VendorsByCategoryParamsType) => {
      set({ vendorsByCategoryIdLoading: true });
      try {
        const { data }: any = await requests.postVendorsByCategory(params);
        set({
          vendorsByCategoryId: data?.data?.category,
        });
        return data;
      } catch (err: any) {
        requestTimeoutError(err, ERRORS.timeot_error);
        return err;
      } finally {
        set({ vendorsByCategoryIdLoading: false });
      }
    },
    getVendorForm: async (params) => {
      set({ vendorForm: { forms: [], vendorInfo: {} }, globalLoading: true });
      try {
        const { data } = await requests.fetchVendorForm(params);
        set({ vendorForm: data?.data });
        return data;
      } catch (err: any) {
        logoutOn401Error(err);
        requestTimeoutError(err, ERRORS.timeot_error);
        return err;
      } finally {
        set({ globalLoading: false });
      }
    },
    // setVendorFormParams: (params) => {
    //   set({ vendorFormParams: params });
    // },
    getVendorInfo: async (params) => {
      set({ vendorInfo: {}, globalLoading: true });
      try {
        const { data } = await requests.fetchVendorInfo(params);
        if (!data?.success) {
          message.error({ content: data?.message });
        }
        set({ vendorInfo: data });
        return data;
      } catch (err: any) {
        logoutOn401Error(err);
        requestTimeoutError(err, ERRORS.timeot_error);
        return err;
      } finally {
        set({ globalLoading: false });
      }
    },
    prepareCard: async (params) => {
      set({ globalLoading: true });
      try {
        const { data } = await requests.postPrepareCard(params);
        if (!data?.success) {
          message.error({ content: data?.message });
        }
        if (data?.success) {
          message.success({ content: data?.message });
        }
        return data;
      } catch (err: any) {
        logoutOn401Error(err);
        requestTimeoutError(err, ERRORS.timeot_error);
        return err;
      } finally {
        set({ globalLoading: false });
      }
    },
    confirmCard: async (params) => {
      set({ globalLoading: true, check: {} });
      try {
        const { data } = await requests.postConfirmCard(params);
        if (!data?.success) {
          message.error({ content: data?.message });
        }
        if (data?.success) {
          set({ check: data?.data });
        }
        return data;
      } catch (err: any) {
        logoutOn401Error(err);
        requestTimeoutError(err, ERRORS.timeot_error);
        return err;
      } finally {
        set({ globalLoading: false });
      }
    },
    prepareCash: async (params) => {
      set({ globalLoading: true });
      try {
        const { data } = await requests.postPrepareCash(params);
        if (!data?.success) {
          message.error({ content: data?.message });
        }
        return data;
      } catch (err: any) {
        logoutOn401Error(err);
        requestTimeoutError(err, ERRORS.timeot_error);
        return err;
      } finally {
        set({ globalLoading: false });
      }
    },
    confirmCash: async (params) => {
      set({ globalLoading: true, check: {} });
      try {
        const { data } = await requests.postConfirmCash(params);
        if (!data?.success) {
          message.error({ content: data?.message });
        }
        if (data?.success) {
          set({ check: data?.data });
        }
        return data;
      } catch (err: any) {
        logoutOn401Error(err);
        requestTimeoutError(err, ERRORS.timeot_error);
        return err;
      } finally {
        set({ globalLoading: false });
      }
    },
    setCheck: (check: CheckType) => {
      set({ check: {} });
      set({ check: check });
    },
    setPayStep: (step: number) => {
      set({ payStep: step });
    },
    clearState: () => {
      set({
        vendorStep: 1,
        // vendorFormParams: {},
        check: {},
      });
    },
  }))
);

export default vendorStore;
