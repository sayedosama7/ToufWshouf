import { Product } from '@/data/products';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchProductApi = createApi({
    reducerPath: 'ProductsData',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        getProduct: builder.query<{ items: Product[] }, void>({
            query: () => '/onlyCurrent/1',
        }),
    }),
});

export const { useGetProductQuery } = FetchProductApi;
