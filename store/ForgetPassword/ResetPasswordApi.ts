import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ResetPasswordApi = createApi({
    reducerPath: 'ResetPassword',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        ResetPassword: builder.mutation<
            any,
            { V_OTP: number; Email: string; TransNo: number; pass: string }
        >({
            query: ({ V_OTP, Email, TransNo, pass }) => ({
                url: `forgetPassword/${Email}`,
                method: 'PUT',
                params: {
                    Email,
                    V_OTP,
                    TransNo,
                    pass,
                },
            }),
        }),
    }),
});

export const { useResetPasswordMutation } = ResetPasswordApi;
