import { createApi } from '@reduxjs/toolkit/query/react';
import { APIBaseQuery } from '../axiosBase';
import { getShowProjects } from '@/redux/features/project/projectSlice';

const VALIDATOR = ['VALIDATOR']

export const apiProject = createApi({
  reducerPath: 'apiProject',
  baseQuery: APIBaseQuery,
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({ url: 'project/OnlyProjects' }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(getShowProjects(data));
        } catch (err) {

        }
      },
      providesTags : VALIDATOR,
    }) ,
  
    getProjectById: builder.query({
      query: (id) => ({ url: `project/projectById` ,
       params:{id}
    }),
    
    }) ,
    getProjectsForUser: builder.query({
      query: () => ({ url: `project/GetProjectsWithCurrentUser` ,
    }),
    
    }) ,
    searchProject: builder.query({
      query: (searchTerm) => ({ url: 'project/search' ,
      params:{searchTerm}
    }),
    async onQueryStarted(_, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
        dispatch(getShowProjects(data));
      } catch (err) {}
    },
    invalidatesTags : VALIDATOR,
    }) ,
    createProject: builder.mutation({
      query: (data) => ({
        url: 'project/create',
        method: 'POST',
        data,
      }),
      invalidatesTags : VALIDATOR,
    }),
     updateProject: builder.mutation({
      query: (data) => ({
        url: `project/update`,
        method: 'PUT',
        data,
      }),
      invalidatesTags : VALIDATOR,
    }),
  }),


});

export const { useLazyGetProjectsQuery ,  useLazySearchProjectQuery , useCreateProjectMutation , useLazyGetProjectByIdQuery , useLazyGetProjectsForUserQuery , useUpdateProjectMutation } = apiProject;