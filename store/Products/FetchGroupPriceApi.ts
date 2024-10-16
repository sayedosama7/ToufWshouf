import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchGroupPriceApi = createApi({
    reducerPath: 'GroupPrice',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        getGroupPrice: builder.query({
            query: ({ code, programyear, groupNo }) =>
                `/GroupPrice/${code}/${programyear}/${groupNo}`,
        }),
    }),
});

export const { useGetGroupPriceQuery } = FetchGroupPriceApi;
