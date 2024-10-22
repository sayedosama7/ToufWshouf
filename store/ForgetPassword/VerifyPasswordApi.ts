import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const VerifyPasswordApi = createApi({
    reducerPath: 'VerifyPassword',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        VerifyPassword: builder.mutation<any, { V_OTP: number; Email: string }>({
            query: ({ V_OTP, Email }) => ({
                url: `forgetPassword/${Email}`,
                method: 'POST',
                body: { V_OTP },
            }),
        }),
    }),
});

export const { useVerifyPasswordMutation } = VerifyPasswordApi;
