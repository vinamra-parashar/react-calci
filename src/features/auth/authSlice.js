import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    registerAction: (state, { payload }) => {
      console.log("payload", payload);
      state.users = [...state?.users, payload];
    },
  },
});

export const { registerAction } = authSlice.actions;

export default authSlice.reducer;
