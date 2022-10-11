import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: process.env.REACT_APP_VISITOR_TOKEN },
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload;
    },
    logOut: (state, action) => {
      state.token = process.env.REACT_APP_VISITOR_TOKEN;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectToken = (state) => state.auth.token;
