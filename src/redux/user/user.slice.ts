import { userType } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  isAuth: boolean;
  userData: userType | null;
};

const initialState: initialStateType = {
  isAuth: false,
  userData: null,
};

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }: PayloadAction<userType>) => {
      state.isAuth = true;
      state.userData = payload;
    },
    logoutUser: (state) => {
      state.isAuth = false;
      state.userData = null;
    },
  },
});

export const { setCurrentUser, logoutUser } = usersSlice.actions;

export default usersSlice.reducer;
