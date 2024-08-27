import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "./user.action";

const initialState = {
  userList: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.userList = action.payload;
    });
  },
});

export default userSlice;
