import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchPolicyApi = createApi({
    reducerPath: 'PolicyData',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        getPolicy: builder.query({
            query: ({ code, programyear }) => `/programpolicy/${code}/${programyear}/Cancel`,
        }),
    }),
});

export const { useGetPolicyQuery } = FetchPolicyApi;
