import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "./auth/authSlice";

const authBaseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", "Bearer " + token);
    }
    return headers;
  },
});

const authBaseQueryWithRefresh = async (args, api, extraOptions) => {
  let result = await authBaseQuery(args, api, extraOptions);
  if (result?.error?.status === 403) {
    console.log("Requesting refresh token");
    const refreshToken = await authBaseQuery(
      `${process.env.REACT_APP_BASE_URL}/auth/refresh`,
      api,
      extraOptions
    );
    if (refreshToken?.data) {
      api.dispatch(setCredentials({ ...refreshToken.data }));
      console.log(`apiSlice.refreshToken: ${refreshToken.data}`);
      result = await authBaseQuery(args, api, extraOptions);
    } else {
      if (refreshToken?.error?.status === 403) {
        refreshToken.error.data.message =
          "Credentials are invalid or expired. ";
      }
      return refreshToken;
    }
  }
  return result;
};

export const apiSlice = createApi({
  tagTypes: ["Restaurants", "Markets", "Foods", "Products", "Users"],
  baseQuery: authBaseQueryWithRefresh,
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  endpoints: () => ({}),
});
