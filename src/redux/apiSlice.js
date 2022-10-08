import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { logOut, setCredentials } from "./auth/authSlice";

// const authBaseQuery = fetchBaseQuery({
//   baseUrl: process.env.REACT_APP_BASE_URL,
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.token;
//     if (token) {
//       headers.set("Authorization", "Bearer " + token);
//     }
//     return headers;
//   },
// });

// const authBaseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await authBaseQuery(args, api, extraOptions);
//   if (result?.data) {
//     const user = api.getState().auth.user;
//     api.dispatch(setCredentials({ ...result.data, user: user }));
//     result = await authBaseQuery(args, api, extraOptions);
//   } else {
//     api.dispatch(logOut());
//   }
//   return result;
// };

export const apiSlice = createApi({
  tagTypes: ["Restaurants", "Markets", "Foods", "Products", "Users"],
  // baseQuery: authBaseQueryWithReauth,
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  endpoints: () => ({}),
});
