import axios from "axios";
import { Store } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Token } from "../utils/types";
import { authActions } from "../store/auth-slice";

let store: Store<RootState>;

export const injectStore = (storeToInject: Store<RootState>) => {
  store = storeToInject;
};

const apiUrl = import.meta.env.VITE_API_URL + "/api";

const instance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.tokens?.accessToken || undefined;
    if (token) {
      if (config.headers) {
        config.headers["Authorization"] = "Bearer " + token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    if (res.headers.pagination) {
      const pagination = JSON.parse(res.headers.pagination);
      if (pagination) {
        res.data = { data: res.data, pagination };
      }
    }
    return res;
  },
  async (err) => {
    if (axios.isCancel(err)) {
      return Promise.reject(err);
    }

    const originalConfig = err.config;
    if (
      !(originalConfig.url === "/Tokens" && originalConfig.method === "put") &&
      err.response
    ) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const tokens = store.getState().auth.tokens as Token;
          const res = await instance.put("/Tokens", {
            refreshToken: tokens.refreshToken,
          });

          store.dispatch(authActions.changeTokens(res.data));
          return instance(originalConfig);
        } catch (_error) {
          store.dispatch(authActions.clearUser());
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);

export default instance;
