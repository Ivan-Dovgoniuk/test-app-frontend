import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const dragonsApi = createApi({
  reducerPath: 'dragonsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spacexdata.com/v4/' }),
  endpoints: (builder) => ({
    getDragons: builder.query({
      query: () => `dragons`
    }),
  }),
})

export const { useGetDragonsQuery} = dragonsApi;