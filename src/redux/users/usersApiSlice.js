import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlice";

const usersAdapter = createEntityAdapter({});
const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => ({
        url: "users",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.IsError;
        },
      }),
      transformResponse: (response) => {
        const fetchedUsers = response.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialState, fetchedUsers);
      },
      providesTags: (result = [], error, arg) => {
        if (result?.ids) {
          return [
            "users",
            ...result.ids.map(({ id }) => ({ type: "Users", id })),
          ];
        } else {
          return ["users"];
        }
      },
    }),
    getUser: build.query({
      query: (id) => ({
        url: `users/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: "Users", id: arg }],
    }),
    addUser: build.mutation({
      query: (user) => ({
        url: "users",
        method: "POST",
        body: { ...user },
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: build.mutation({
      query: (user) => ({
        url: `users/${user.id}`,
        method: "PATCH",
        body: { ...user },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Users", id: arg.id }],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;
