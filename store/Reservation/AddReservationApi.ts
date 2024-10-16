import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AddReservationApi = createApi({
    reducerPath: 'AddReservation',
    tagTypes: ['Reservation'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        addReservation: builder.mutation({
            query: values => ({
                url: '/Reservation/',
                method: 'POST',
                body: values,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['Reservation'],
        }),
    }),
});

export const { useAddReservationMutation } = AddReservationApi;
