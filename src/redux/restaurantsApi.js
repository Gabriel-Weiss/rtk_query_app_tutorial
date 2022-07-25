import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const restaurantsApi = createApi({
  reducerPath:'restaurants',
  tagTypes: ['Restaurants'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: (build) => ({
    getRestaurants: build.query({
      query: () => 'restaurants',
      transformResponse: response => response.sort((a, b) => b.id - a.id),
      providesTags: ['Restaurants'],
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
      invalidatesTags: ['Restaurants'],
    }),
    deleteRestaurant: build.mutation({
      query: id => ({
        url: `restaurants/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Restaurants'],
    }),
    getRestaurant: build.query({
      query: restaurant => ({
        url: `restaurants/${restaurant.id}`
      })
    }),
  })
});

export const { 
  useGetRestaurantsQuery, 
  useAddRestaurantMutation, 
  useUpdateRestaurantMutation, 
  useDeleteRestaurantMutation,
  useGetRestaurantQuery
} = restaurantsApi;