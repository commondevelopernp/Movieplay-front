import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DataLoadStatus, IUser} from '../../types';
import {RootState} from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  jwt: string | null;
  user: IUser | null;
  refreshToken: string | null;
  status: DataLoadStatus;
}

const initialState: AuthState = {
  jwt: null,
  user: null,
  refreshToken: null,
  status: DataLoadStatus.NOT_REQUESTED_YET,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.jwt = null;
      state.user = null;
      state.refreshToken = null;
      AsyncStorage.removeItem('jwt');
      AsyncStorage.removeItem('refreshToken');
    },
    setRefreshToken(state, action: PayloadAction<string>) {
      state.refreshToken = action.payload;
      AsyncStorage.setItem('refreshToken', action.payload);
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.jwt = action.payload;
      AsyncStorage.setItem('jwt', action.payload);
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.jwt = null;
      state.refreshToken = null;
      AsyncStorage.removeItem('jwt');
      AsyncStorage.removeItem('refreshToken');
    },
  },
});

export const {logout, setRefreshToken, setAccessToken, setUser, clearUser} =
  authSlice.actions;
export default authSlice.reducer;

export const selectAuthState = (state: RootState) => state.auth;
