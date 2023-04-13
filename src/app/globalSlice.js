import { createSlice } from "@reduxjs/toolkit";
import { persistedState } from "redux-persist";

const initialState = {
  type: 0,
  login: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    handleLogin: (state) => {
      console.log("我执行了");
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.login = true;
    },
    handleLogout: (state) => {
      state.login = false;
    },
    setType: (state, action) => {
      console.log("action.payload.type", action.payload);
      state.type = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleLogin, handleLogout, setType } = globalSlice.actions;

export default globalSlice.reducer;
