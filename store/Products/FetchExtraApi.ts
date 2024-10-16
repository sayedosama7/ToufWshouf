import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchExtraApi = createApi({
    reducerPath: 'ExtraData',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        getExtra: builder.query({
            query: ({ code, programyear }) => `/ExtraProgram/${code}/${programyear}`,
        }),
    }),
});

export const { useGetExtraQuery } = FetchExtraApi;
