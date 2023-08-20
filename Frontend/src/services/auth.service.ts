import { AppDispatch } from "../store";
import { authActions } from "../store/auth-slice";
import { Token, User } from "../utils/types";
import api from "./api";

export const login = async (
  username: string,
  password: string
): Promise<Token> => {
  const res = await api.post("/Tokens", {
    Username: username,
    Password: password,
  });
  return res.data;
};

export const refresh = async (token: string) => {
  const res = await api.put("/Tokens", {
    token,
  });
  return res.data;
};

export const logout = async (dispatch: AppDispatch, signal?: AbortSignal) => {
  try {
    const res = await api.delete("/Tokens", { signal: signal });
    return res.data;
  } catch (e) {
    return Promise.reject(e);
  } finally {
    dispatch(authActions.clearUser());
  }
};

export const getProfile = async (): Promise<User> => {
  const res = await api.get("/Users/profile");
  return res.data;
};
