import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: process.env.REACT_APP_VISITOR_TOKEN,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload;
    },
    logOut: (state, action) => {
      state.token = initialState.token;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectToken = (state) => state.auth.token;
