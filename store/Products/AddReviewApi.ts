import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AddReviewApi = createApi({
    reducerPath: 'AddReview',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        addReview: builder.mutation<any, { code: number; rate: number; cust: number; programyear: number; review: string }>({
            query: ({ code, programyear, cust, rate, review }) => ({
                url: `programReview/${code}/${programyear}`,  
                method: 'POST',
                body: { cust, rate, review }, 
            }),
        }),
    }),
});

export const { useAddReviewMutation } = AddReviewApi;
