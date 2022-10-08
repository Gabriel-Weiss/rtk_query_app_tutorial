import { apiSlice } from "../apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (credentials) => ({
        method: "POST",
        url: "/auth",
        body: credentials,
      }),
    }),
    getUsers: builder.query({
      query: () => "users",
    }),
  }),
});

export const { useSignUpMutation, useGetUsersQuery } = authApiSlice;
