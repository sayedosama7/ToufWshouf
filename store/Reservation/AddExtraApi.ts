import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AddExtraApi = createApi({
    reducerPath: 'AddExtra',
    tagTypes: ['addExtra'],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
    }),
    endpoints: builder => ({
        addExtra: builder.mutation({
            query: ({ code, year, ...values }) => {
                // Create form data
                const formData = new FormData();
                Object.keys(values).forEach(key => {
                    formData.append(key, values[key]);
                });

                return {
                    url: `/ExtraProgram/${code}/${year}`,
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['addExtra'],
        }),
    }),
});

export const { useAddExtraMutation } = AddExtraApi;
