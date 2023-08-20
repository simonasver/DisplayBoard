import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token, User } from "../utils/types";

interface AuthState {
  tokens: Token | undefined;
  user: User | undefined;
}

const initialState: AuthState = {
  tokens: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    changeTokens(state, action: PayloadAction<Token>) {
      state.tokens = action.payload;
    },
    changeUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = undefined;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
