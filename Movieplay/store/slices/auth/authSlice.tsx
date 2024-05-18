import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DataLoadStatus, IUser} from '../../types';
import {RootState} from '../../store';

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
    },
    setRefreshToken(state, action: PayloadAction<string>) {
      state.refreshToken = action.payload;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.jwt = action.payload;
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
  },
});

export const {logout, setRefreshToken, setAccessToken, setUser} =
  authSlice.actions;
export default authSlice.reducer;

export const selectAuthState = (state: RootState) => state.auth;
