import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AddReservationDetailsApi = createApi({
    reducerPath: 'AddReservationDetails',
    tagTypes: ['ReservationDetails'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        addReservationDetails: builder.mutation({
            query: values => ({
                url: '/DetailsesRev/',
                method: 'POST',
                body: values,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['ReservationDetails'],
        }),
    }),
});

export const { useAddReservationDetailsMutation } = AddReservationDetailsApi;
