import { apiSlice } from "../apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
      providesTags: (result = [], error, arg) => [
        "Products",
        ...result.map(({ id }) => ({ type: "Products", id })),
      ],
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `products/${id}`,
      }),
      providesTags: (result, error, arg) => [{ type: "Products", id: arg }],
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: "products",
        method: "POST",
        body: {
          ...product,
          rating: {
            rate: 0,
            count: 0,
          },
        },
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `products/${product._id}`,
        method: "PATCH",
        body: {
          ...product,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Products", id: arg._id },
      ],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApiSlice;
