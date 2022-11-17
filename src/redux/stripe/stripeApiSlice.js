import { apiSlice } from "../apiSlice";

export const stripeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPublishableKey: builder.query({
      // query: () => "stripe/config",
      query: () => ({
        url: "/stripe/config",
        method: "get",
        headers: { "Content-Type": "application/json" },
      }),
    }),
    makePayment: builder.mutation({
      query: (body) => ({
        url: "stripe/payment",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      }),
    }),
  }),
});

export const { useGetPublishableKeyQuery, useMakePaymentMutation } =
  stripeApiSlice;
