import {configureStore} from '@reduxjs/toolkit';
import {apiSlice} from './slices/api/apiSlice';
import authReducer from './slices/auth/authSlice';
import userReducer from './slices/user/userSlice';
import movieReducer from './slices/movie/movieSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    user: userReducer,
    movie: movieReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
