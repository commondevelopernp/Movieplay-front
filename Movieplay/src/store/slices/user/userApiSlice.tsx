import {IUser} from '../../types';
import {apiSlice} from '../api/apiSlice';

type UpdateProfileRequest = {
  id: number;
  firstName?: string;
  lastName?: string;
  nickname?: string;
  email?: string;
  profileImage?: string;
  ratings: number[];
  favorited?: number[];
};

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    deleteUser: builder.mutation<void, {id: number}>({
      query: ({id}) => ({
        url: `/api/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    getUserProfile: builder.query<IUser[], {id: number}>({
      query: ({id}) => ({
        url: `/api/users/${id}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    updateUserProfile: builder.mutation<void, UpdateProfileRequest>({
      query: ({id, ...body}) => ({
        url: `/api/users/${id}`,
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
