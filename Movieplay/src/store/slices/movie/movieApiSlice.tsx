import {IMovie} from '../../types';
import {apiSlice} from '../api/apiSlice';

export const movieApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getMovies: builder.query<
      IMovie[],
      {
        genre?: string;
        title?: string;
        sort?: string;
        order?: string;
        page?: number;
        pageSize?: number;
      }
    >({
      query: ({genre, title, sort, order, page, pageSize}) => ({
        url: '/api/movies',
        method: 'GET',
        params: {genre, title, sort, order, page, pageSize},
      }),
      providesTags: ['Movie'],
    }),
    rateMovie: builder.mutation<void, {id: string; rating: {rating: number}}>({
      query: ({id, rating}) => ({
        url: `/api/movies/${id}/rating`,
        method: 'POST',
        body: rating,
      }),
      invalidatesTags: ['Movie'],
    }),
    addFavoriteMovie: builder.mutation<void, {id: string}>({
      query: ({id}) => ({
        url: `/api/movies/favorites/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Movie'],
    }),
    removeFavoriteMovie: builder.mutation<void, {id: string}>({
      query: ({id}) => ({
        url: `/api/movies/${id}/favorites`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Movie'],
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useRateMovieMutation,
  useAddFavoriteMovieMutation,
  useRemoveFavoriteMovieMutation,
} = movieApiSlice;
