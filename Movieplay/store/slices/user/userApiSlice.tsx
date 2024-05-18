import {IUser} from '../../types';
import {apiSlice} from '../api/apiSlice';

type UserProfileResponse = IUser;

type UpdateProfileRequest = {
  nickname: string;
};

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    deleteUser: builder.mutation<void, void>({
      query: () => ({
        url: '/users',
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    getUserProfile: builder.query<UserProfileResponse, void>({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    updateUserProfile: builder.mutation<void, UpdateProfileRequest>({
      query: body => ({
        url: '/users',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useDeleteUserMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} = userApiSlice;
