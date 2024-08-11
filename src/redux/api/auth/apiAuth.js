import { createApi } from '@reduxjs/toolkit/query/react';
import { APIBaseQuery,  } from '../axiosBase';
import { setToken ,setProfile ,setUser } from '@/redux/features/auth/authSlice';

const VALIDATOR = ['VALIDATOR']

export const apiAuth = createApi({
  reducerPath: 'apiAuth',
  baseQuery: APIBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: 'auth/admin/token',
        method: 'POST',
        data,
      }), 
      providesTags : VALIDATOR,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data));
          dispatch(setUser(data));
        } catch (err) {
          
        }
      },
     
    }),

    getProfile: builder.query({
      query() {
        return {
          url: "auth/profile",
        };
      },
      invalidatesTags : VALIDATOR,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProfile(data));
        } catch (error) {
          
        }
      },
      
    }),

  }),
});

export const { useLoginMutation , useLazyGetProfileQuery } = apiAuth;