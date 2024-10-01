import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const RegisterApi = createApi({
    reducerPath: 'AddUser',
    tagTypes: ['Users'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        addUser: builder.mutation({
            query: values => ({
                url: '/client/',
                method: 'POST',
                body: values,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['Users'],
        }),
    }),
});

export const { useAddUserMutation } = RegisterApi;
