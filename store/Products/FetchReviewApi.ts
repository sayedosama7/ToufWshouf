import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchReviewApi = createApi({
    reducerPath: 'ReviewData',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        getReview: builder.query({
            query: ({ code, programyear }) => `/programReview/${code}/${programyear}`,
        }),
    }),
});

export const { useGetReviewQuery } = FetchReviewApi;
