import { createApi } from '@reduxjs/toolkit/query/react';
import { APIBaseQuery } from '../axiosBase';


const VALIDATOR = ['VALIDATOR']
export const apiTeam = createApi({
  reducerPath: 'apiTeam',
  baseQuery: APIBaseQuery,
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: () => ({ url: 'team/OnlyTeams' }),
      providesTags : VALIDATOR,
    }) ,
    getTeamById: builder.query({
      query: (id) => ({ url: `team/TeamById` ,
       params:{id}
    }),
    }) ,
    createTeam: builder.mutation({
      query: (data) => ({
        url: 'team/create',
        method: 'POST',
        data,
      }),
      invalidatesTags : VALIDATOR,
    }),
    deleteTeam: builder.mutation({
      query: (id) => ({
        url: `team/delete`,
        method: 'DELETE',
        data:{
          id,
        }
      }),
      invalidatesTags : VALIDATOR,
    }),
     updateTeam: builder.mutation({
      query: (data) => ({
        url: `team/update`,
        method: 'PUT',
        data,
      }),
      invalidatesTags : VALIDATOR,
    }),
  }),


});

export const { useLazyGetTeamsQuery ,useCreateTeamMutation ,useLazyGetTeamByIdQuery ,useDeleteTeamMutation ,useUpdateTeamMutation } = apiTeam;