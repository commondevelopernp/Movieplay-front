// slices/movieSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import {DataLoadStatus, IMovie} from '../../types';

interface MovieState {
  movies: IMovie[];
  total: number;
  status: DataLoadStatus;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  total: 0,
  status: DataLoadStatus.NOT_REQUESTED_YET,
  error: null,
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
  },
});

export const {setMovies, setError, setLoading, clearError} = movieSlice.actions;

export default movieSlice.reducer;

export const selectMovieState = (state: RootState) => state.movie;
