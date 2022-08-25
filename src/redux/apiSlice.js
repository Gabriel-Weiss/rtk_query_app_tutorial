import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  tagTypes: ["Restaurants", "Markets", "Foods", "Products"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: () => ({}),
});
