import { apiSlice } from "../apiSlice";

export const marketsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMarkets: builder.query({
      query: () => 'magazine',
      transformResponse: response => response.sort((a, b) => b.id - a.id),
      providesTags: ['Markets'],
    }),
    getMarket: builder.query({
      query: market => ({
        url: `magazine/${market.id}`
      })
    }),
    addMarket: builder.mutation({
      query: market => ({
        url: 'magazine',
        method: 'POST',
        body: market
      }),
      invalidatesTags: ['Markets'],
    }),
    updateMarket: builder.mutation({
      query: market => ({
        url: `magazine/${market.id}`,
        method: 'PATCH',
        body: market
      }),
      invalidatesTags: ['Markets'],
    }),
    deleteMarket: builder.mutation({
      query: id => ({
        url: `magazine/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Markets'],
    }),
  })
})

export const {
  useGetMarketsQuery,
  useAddMarketMutation,
  useDeleteMarketMutation,
  useGetMarketQuery,
  useUpdateMarketMutation,
} = marketsApiSlice