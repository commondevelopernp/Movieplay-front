import {configureStore} from '@reduxjs/toolkit';
import {apiSlice} from './slices/api/apiSlice';
import authReducer from './slices/auth/authSlice';
import userReducer from './slices/user/userSlice';
import movieReducer from './slices/movie/movieSlice';

const isDevelopment = process.env.NODE_ENV === 'development';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    user: userReducer,
    movie: movieReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // Disabling the middleware in development mode
      serializableCheck: isDevelopment
        ? false
        : {
            // Optionally, you can still keep it enabled and configure it to ignore specific paths
            ignoredActions: ['your/action/type'],
            ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
            ignoredPaths: ['items.dates'],
          },
    }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
