// slices/userSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DataLoadStatus, IUser} from '../../types';
import {RootState} from '../../store';

interface UserState {
  user: IUser | null;
  status: DataLoadStatus;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: DataLoadStatus.NOT_REQUESTED_YET,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
      state.status = DataLoadStatus.SUCCESS;
    },
    updateUser(state, action: PayloadAction<Partial<IUser>>) {
      if (state.user) {
        state.user = {...state.user, ...action.payload};
        state.status = DataLoadStatus.SUCCESS;
      }
    },
    clearUser(state) {
      state.user = null;
      state.status = DataLoadStatus.NOT_REQUESTED_YET;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.status = DataLoadStatus.ERROR;
    },
    setLoading(state) {
      state.status = DataLoadStatus.LOADING;
    },
  },
});

export const {setUser, updateUser, clearUser, setError, setLoading} =
  userSlice.actions;

export default userSlice.reducer;

export const selectUserState = (state: RootState) => state.user;
