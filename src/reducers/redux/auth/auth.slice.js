import { createSlice } from "@reduxjs/toolkit";
import { register, login } from "./auth.action";

console.log(login, "---check login----");

const initialState = {
  register_data: "",
  login_data: "",
  user: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.register_data = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.login_data = action.payload;
      });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice;
