// slices/movieApiSlice.ts
import {IMovie} from '../../types';
import {apiSlice} from '../api/apiSlice';

type MoviesResponse = {
  total: number;
  movies: IMovie[];
};

type MovieRatingRequest = {
  rating: number;
};

export const movieApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getMovies: builder.query<
      MoviesResponse,
      {
        genre?: string;
        title?: string;
        actor?: string;
        sort?: string;
        order?: string;
        page?: number;
        pageSize?: number;
      }
    >({
      query: params => ({
        url: '/movies',
        method: 'GET',
        params,
      }),
      providesTags: ['Movie'],
    }),
    rateMovie: builder.mutation<void, {id: string; rating: MovieRatingRequest}>(
      {
        query: ({id, rating}) => ({
          url: `/movies/${id}/rating`,
          method: 'POST',
          body: rating,
        }),
        invalidatesTags: ['Movie'],
      },
    ),
    addFavoriteMovie: builder.mutation<void, {id: string}>({
      query: ({id}) => ({
        url: `/movies/${id}/favorites`,
        method: 'POST',
      }),
      invalidatesTags: ['Movie'],
    }),
    removeFavoriteMovie: builder.mutation<void, {id: string}>({
      query: ({id}) => ({
        url: `/movies/${id}/favorites`,
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
