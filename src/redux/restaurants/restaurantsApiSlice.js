import { apiSlice } from "../apiSlice";

export const restaurantsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getRestaurants: build.query({
      query: () => 'restaurants',
      transformResponse: response => response.sort((a, b) => b.id - a.id),
      providesTags: (result = [], error, arg) => [
        'Restaurants',
        ...result.map(({id}) => ({type: 'Restaurants', id}))
      ],
    }),
    getRestaurant: build.query({
      query: restaurant => ({
        url: `restaurants/${restaurant.id}`
      }),
      providesTags: (result, error, arg) => [{ type: 'Restaurants', id: arg }]
    }),
    addRestaurant: build.mutation({
      query: restaurant => ({
        url: 'restaurants',
        method: 'POST',
        body: restaurant
      }),
      invalidatesTags: ['Restaurants'],
    }),
    updateRestaurant: build.mutation({
      query: restaurant => ({
        url: `restaurants/${restaurant.id}`,
        method: 'PATCH',
        body: restaurant
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Restaurants', id: arg.id}],
    }),
    deleteRestaurant: build.mutation({
      query: id => ({
        url: `restaurants/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Restaurants'],
    }),
  })
})

export const { 
  useGetRestaurantsQuery, 
  useAddRestaurantMutation, 
  useUpdateRestaurantMutation, 
  useDeleteRestaurantMutation,
  useGetRestaurantQuery,
} = restaurantsApiSlice