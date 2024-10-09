import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const LoginApi = createApi({
    reducerPath: 'Login',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        loginUser: builder.query({
            query: ({ Email, Pword }) => `ClientLogin/${Email}/${Pword}`,
        }),
    }),
});

export const { useLazyLoginUserQuery } = LoginApi;
