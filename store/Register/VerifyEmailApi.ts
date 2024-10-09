import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const VerifyEmailApi = createApi({
    reducerPath: 'VerifyEmail',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        verifyEmail: builder.mutation<any, { OTP: number; p_Mail: string; TEL: string }>({
            query: ({ OTP, p_Mail, TEL }) => ({
                url: `validation/${OTP}`,
                method: 'POST',
                body: { p_Mail, TEL },
            }),
        }),
    }),
});

export const { useVerifyEmailMutation } = VerifyEmailApi;
