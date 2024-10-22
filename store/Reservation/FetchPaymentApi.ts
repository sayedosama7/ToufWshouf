import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchPaymentApi = createApi({
    reducerPath: 'PaymentData',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        getPayment: builder.query({
            query: ({ ref, sp }) => `/payment/${ref}/${sp}`,
        }),
    }),
});

export const { useGetPaymentQuery } = FetchPaymentApi;
