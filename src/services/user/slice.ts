import { TUserState } from './type';
import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction
} from '@reduxjs/toolkit';
import { loginUser, logoutUser, registerUser, updateUser } from './actions';
import { TUser } from '@utils-types';
import {
  handleFulfilled,
  handlePending,
  handleRejected
} from '../../utils/asyncHandlers';

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  error: null,
  isLoading: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectError: (state) => state.error,
    selectIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload.user };
      })
      .addMatcher(isFulfilled(loginUser, registerUser), (state, action) => {
        state.user = action.payload.user;
      })
      .addMatcher(
        isFulfilled(logoutUser, updateUser, loginUser, registerUser),
        handleFulfilled
      )
      .addMatcher(
        isPending(logoutUser, updateUser, loginUser, registerUser),
        handlePending
      )
      .addMatcher(
        isRejected(logoutUser, updateUser, loginUser, registerUser),
        handleRejected
      );
  }
});

export const { setUser, setIsAuthChecked } = userSlice.actions;
export const userSelectors = userSlice.selectors;
