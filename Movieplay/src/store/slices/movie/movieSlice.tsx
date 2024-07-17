import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import {DataLoadStatus, IMovie} from '../../types';

interface MovieState {
  movies: IMovie[];
  total: number;
  status: DataLoadStatus;
  error: string | null;
  searchParams: {
    query: string;
    genre: string;
    sort: string;
    order: string;
    page: number;
    pageSize: number;
    rate: string;
    releaseDateSort: string;
  };
}

const initialState: MovieState = {
  movies: [],
  total: 0,
  status: DataLoadStatus.NOT_REQUESTED_YET,
  error: null,
  searchParams: {
    query: '',
    genre: '',
    sort: '',
    order: 'asc',
    rate: '',
    releaseDateSort: '',
    page: 1,
    pageSize: 10,
  },
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<{movies: IMovie[]; total: number}>) {
      state.movies = action.payload.movies;
      state.total = action.payload.total;
      state.status = DataLoadStatus.SUCCESS;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.status = DataLoadStatus.ERROR;
    },
    setLoading(state) {
      state.status = DataLoadStatus.LOADING;
    },
    clearError(state) {
      state.error = null;
      state.status = DataLoadStatus.NOT_REQUESTED_YET;
    },
    setSearchParams(
      state,
      action: PayloadAction<{
        query: string;
        genre: string;
        sort: string;
        order: string;
        page: number;
        pageSize: number;
        rate: string;
        releaseDateSort: string;
      }>,
    ) {
      state.searchParams = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchParams.query = action.payload;
    },
    setGenre(state, action: PayloadAction<string>) {
      state.searchParams.genre = action.payload;
    },
    setSort(state, action: PayloadAction<string>) {
      state.searchParams.sort = action.payload;
    },
    setOrder(state, action: PayloadAction<string>) {
      state.searchParams.order = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.searchParams.page = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.searchParams.pageSize = action.payload;
    },
    setRate(state, action: PayloadAction<string>) {
      state.searchParams.rate = action.payload;
    },
    setReleaseDateSort(state, action: PayloadAction<string>) {
      state.searchParams.releaseDateSort = action.payload;
    },
  },
});

export const {
  setMovies,
  setError,
  setLoading,
  clearError,
  setSearchParams,
  setSearchQuery,
  setGenre,
  setSort,
  setOrder,
  setPage,
  setPageSize,
  setRate,
  setReleaseDateSort,
} = movieSlice.actions;

export default movieSlice.reducer;

export const selectMovieState = (state: RootState) => state.movie;
