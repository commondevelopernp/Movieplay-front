// slices/authApiSlice.ts
import {IUser} from '../../types';
import {apiSlice} from '../api/apiSlice';

type AuthResponse = {
  jwt: string;
  user: IUser;
  refreshToken: string;
};

type RefreshResponse = {
  accessToken: string;
};

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<AuthResponse, {oauthToken: string}>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    refresh: builder.mutation<RefreshResponse, {refreshToken: string}>({
      query: body => ({
        url: '/auth/refresh',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {useLoginMutation, useLogoutMutation, useRefreshMutation} =
  authApiSlice;
