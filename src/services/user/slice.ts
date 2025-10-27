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

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  error: null,
  isAuthRequest: false
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
    selectUserError: (state) => state.error,
    selectIsAuthRequest: (state) => state.isAuthRequest
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
      .addMatcher(isFulfilled(), (state) => {
        state.isAuthRequest = false;
      })
      .addMatcher(isPending(), (state) => {
        state.isAuthRequest = true;
        state.error = null;
      })
      .addMatcher(isRejected(), (state, action) => {
        state.isAuthRequest = false;
        state.error = action.error.message || 'Произошла неизвестная ошибка';
      });
  }
});

export const { setUser, setIsAuthChecked } = userSlice.actions;
export const {
  selectUser,
  selectIsAuthChecked,
  selectUserError,
  selectIsAuthRequest
} = userSlice.selectors;
