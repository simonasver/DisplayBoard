import { User } from "../utils/types";
import api from "./api";

export const getAllUsers = async (signal?: AbortSignal): Promise<User[]> => {
  const res = await api.get("/Users", { signal: signal });
  return res.data;
};
