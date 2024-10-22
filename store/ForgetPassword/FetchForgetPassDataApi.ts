import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchForgetPassDataApi = createApi({
    reducerPath: 'ForgetPass',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        forgetPass: builder.query({
            query: ({ Email }) => `forgetPassword/${Email}`,
        }),
    }),
});

export const { useLazyForgetPassQuery } = FetchForgetPassDataApi;
