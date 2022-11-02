import { apiSlice } from "../apiSlice";

export const stripeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPublishableKey: builder.query({
      query: () => "payment/config",
    }),
    makePayment: builder.mutation({
      query: (body) => ({
        url: "payment/stripe",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetPublishableKeyQuery, useMakePaymentMutation } =
  stripeApiSlice;
