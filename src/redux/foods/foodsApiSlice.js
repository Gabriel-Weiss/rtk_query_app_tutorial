import { apiSlice } from "../apiSlice";

export const foodsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFoods: builder.query({
      query: () => "foods",
      providesTags: (result = [], error, arg) => [
        "Foods",
        ...result.map(({ id }) => ({ type: "Foods", id })),
      ],
    }),
    getFood: builder.query({
      query: (id) => ({
        url: `foods/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: "Foods", id: arg }],
    }),
    addFood: builder.mutation({
      query: (food) => ({
        url: "foods",
        method: "POST",
        body: {
          ...food,
        },
      }),
      invalidatesTags: ["Foods"],
    }),
    updateFood: builder.mutation({
      query: (food) => ({
        url: `foods/${food._id}`,
        method: "PATCH",
        body: {
          ...food,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Foods", id: arg._id }],
    }),
    deleteFood: builder.mutation({
      query: (id) => ({
        url: `foods/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Foods"],
    }),
  }),
});

export const {
  useGetFoodsQuery,
  useGetFoodQuery,
  useAddFoodMutation,
  useUpdateFoodMutation,
  useDeleteFoodMutation,
} = foodsApiSlice;
