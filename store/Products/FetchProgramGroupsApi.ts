import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FetchProgramGroupsApi = createApi({
    reducerPath: 'ProgramGroups',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    }),
    endpoints: builder => ({
        getProgramGroup: builder.query({
            query: ({ code, programyear }) => `/ProgramGroups/${code}/${programyear}`,
        }),
    }),
});

export const { useGetProgramGroupQuery } = FetchProgramGroupsApi;
