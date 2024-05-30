import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import config from '../../../config/default.json';
import {RootState} from '../../store';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseUrl,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).auth.jwt;
      headers.set('Content-Type', 'application/json');
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['User', 'Movie'],
  endpoints: () => ({}),
});
