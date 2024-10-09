import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchImagesApi = createApi({
    reducerPath: 'imagesData',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        getImg: builder.query({
            query: ({ code, programyear }) => `/Images/${code}/${programyear}`,
        }),
    }),
});

export const { useGetImgQuery } = FetchImagesApi;
