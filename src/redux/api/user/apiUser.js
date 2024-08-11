import { createApi } from '@reduxjs/toolkit/query/react';
import { APIBaseQuery, } from '../axiosBase';
import { getShowEmployees } from '@/redux/features/users/usersSlice';


const VALIDATOR = ['VALIDATOR']

export const apiUser = createApi({
  reducerPath: 'apiUser',
  baseQuery: APIBaseQuery,
  tagTypes : VALIDATOR,
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (data) => ({ url: 'user' ,  params:data }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(getShowEmployees(data));
        } catch (err) {}
      },
      providesTags : VALIDATOR,
    }),
    getUserById: builder.query({
      query: (id) => ({ url: `user/${id}` ,
    }),
    }),
    getRoles: builder.query({
      query: () => ({ url: 'role' }),
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: 'user/register',
        method: 'POST',
        data,
      }),
      invalidatesTags : VALIDATOR,
    }) ,
    updateUser: builder.mutation({
      query: (data) => ({
        url: 'user',
        method: 'PUT',
        data,
      }),
      invalidatesTags : VALIDATOR,
    }) ,
    resetPassword: builder.mutation({
      query: (data) => ({
        url: 'user/resetpassword',
        method: 'PUT',
        data,
      }),
    }) ,
    changePassword: builder.mutation({
      query: (data) => ({
        url: 'user/changePassword',
        method: 'PUT',
        data,
      }),
    }) ,

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `user`,
        method: 'DELETE',
        data:{
          id,
        }
      }),
      invalidatesTags : VALIDATOR,
    }),
    
    sendOtp: builder.mutation({
      query: (data) => ({
        url: 'user/sendopt',
        method: 'POST',
        data,
      }),
    }) ,

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: 'user/forgotpassword',
        method: 'PATCH',
        data,
      }),
    }) ,
  }),
});

export const { useLazyGetUsersQuery , useLazyGetUserByIdQuery  , useLazyGetRolesQuery , useCreateUserMutation ,  useUpdateUserMutation , useResetPasswordMutation , useChangePasswordMutation , useDeleteUserMutation , useSendOtpMutation , useForgotPasswordMutation } = apiUser;