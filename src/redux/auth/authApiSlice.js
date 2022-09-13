import { apiSlice } from "../apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        method: "POST",
        url: "/users",
        body: { ...credentials },
      }),
    }),
    getUsers: builder.query({
      query: () => "users",
    }),
    getUserByUsername: builder.query({
      query: (username) => `users/${username}`,
    }),
  }),
});

export const { useLoginMutation, useGetUsersQuery, useGetUserByUsernameQuery } =
  authApiSlice;
