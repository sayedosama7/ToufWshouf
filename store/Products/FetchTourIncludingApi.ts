import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchTourIncludingApi = createApi({
    reducerPath: 'IncludingData',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        getIncluding: builder.query({
            query: ({ code, programyear }) => `/tourincluding/${code}/${programyear}`,
        }),
    }),
});

export const { useGetIncludingQuery } = FetchTourIncludingApi;
