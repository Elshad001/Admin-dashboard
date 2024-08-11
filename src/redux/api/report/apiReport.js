import { createApi } from '@reduxjs/toolkit/query/react';
import { APIBaseQuery } from '../axiosBase';
import { setShowReports ,setShowReportsForUser , setShowFilterdReports } from '@/redux/features/dailyReports/dailyReportsSlice';

const VALIDATOR = ['VALIDATOR']
export const apiReport = createApi({
  reducerPath: 'apiReport',
  baseQuery: APIBaseQuery,
  endpoints: (builder) => ({
    getAllReports: builder.query({
      query: () => ({ url: 'report/AllReports' }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setShowReports(data));
        } catch (err) {}
      },
      providesTags : VALIDATOR,
    }) ,
    getFilteredReports: builder.query({
      query: (data) => ({ url: 'report/filter' ,  params:data }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setShowFilterdReports(data));
        } catch (err) {}
      },
      providesTags : VALIDATOR,
    }) ,
    getReportsForUser: builder.query({
      query: () => ({ url: 'report/GetReportsForCurrentUser' }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setShowReportsForUser(data));
        } catch (err) {}
      },
      providesTags : VALIDATOR,
    }) ,
    getReportById: builder.query({
      query: (id) => ({ url: `report/GetReportById` ,
       params:{id}
    }),
    }) ,
    getReportByIdForUser: builder.query({
      query: (id) => ({ url: `report/GetReportByIdForCurrentUser` ,
       params:{id}
    }),
    }) ,
    createReport: builder.mutation({
      query: (data) => ({
        url: 'report/create',
        method: 'POST',
        data,
      }),
      invalidatesTags : VALIDATOR,
    }),
    updateReport: builder.mutation({
      query: (data) => ({
        url: 'report/update',
        method: 'PUT',
        data,
      }),
      invalidatesTags : VALIDATOR,
    }),
  }),


});

export const { useLazyGetAllReportsQuery , useLazyGetFilteredReportsQuery , useLazyGetReportsForUserQuery , useLazyGetReportByIdQuery , useLazyGetReportByIdForUserQuery ,  useCreateReportMutation , useUpdateReportMutation } = apiReport;