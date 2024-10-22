import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchNationalityApi = createApi({
    reducerPath: 'NationalityData',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://app.misrtravelco.net:4444/ords/invoice/country/country/',
    }),
    endpoints: builder => ({
        getNationality: builder.query({
            query: () => `O`,
        }),
    }),
});

export const { useGetNationalityQuery } = FetchNationalityApi;
