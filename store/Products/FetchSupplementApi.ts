import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchSupplementApi = createApi({
    reducerPath: 'SupplementData',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        getSupplement: builder.query({
            query: ({ code, programyear }) => `/ProgramIncluding/${code}/${programyear}`,
        }),
    }),
});

export const { useGetSupplementQuery } = FetchSupplementApi;
