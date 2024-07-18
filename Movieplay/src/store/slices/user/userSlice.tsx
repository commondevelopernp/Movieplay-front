import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import {DataLoadStatus, IUser} from '../../types';

interface UserState {
  user: IUser | null;
  status: DataLoadStatus;
  error: string | null;
  userId?:number;
}

const initialState: UserState = {
  user: null,
  status: DataLoadStatus.NOT_REQUESTED_YET,
  error: null,
  userId:undefined,
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
    setUserId(state,action:PayloadAction<number>){
        state.user.userId=action.payload;
        },
  },
});

export const {setUser, updateUser, clearUser, setError, setLoading,setUserId} =
  userSlice.actions;

export default userSlice.reducer;

export const selectUserState = (state: RootState) => state.user;
