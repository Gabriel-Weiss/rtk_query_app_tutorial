import { apiSlice } from "../apiSlice";

export const marketsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMarkets: builder.query({
      query: () => "markets",
      providesTags: (result = [], error, arg) => [
        "Markets",
        ...result.map(({ id }) => ({ type: "Markets", id })),
      ],
    }),
    getMarket: builder.query({
      query: (id) => ({
        url: `markets/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: "Markets", id: arg }],
    }),
    addMarket: builder.mutation({
      query: (market) => ({
        url: "markets",
        method: "POST",
        body: {
          ...market,
        },
      }),
      invalidatesTags: ["Markets"],
    }),
    updateMarket: builder.mutation({
      query: (market) => ({
        url: `markets/${market._id}`,
        method: "PATCH",
        body: {
          ...market,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Markets", id: arg._id },
      ],
    }),
    deleteMarket: builder.mutation({
      query: (id) => ({
        url: `markets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Markets"],
    }),
  }),
});

export const {
  useGetMarketsQuery,
  useAddMarketMutation,
  useDeleteMarketMutation,
  useGetMarketQuery,
  useUpdateMarketMutation,
} = marketsApiSlice;
