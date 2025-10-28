import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  isTokenExists,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { setIsAuthChecked, setUser } from './slice';

export const loginUser = createAsyncThunk('user/login', loginUserApi);

export const logoutUser = createAsyncThunk('user/logout', logoutApi);

export const registerUser = createAsyncThunk('user/register', registerUserApi);

export const updateUser = createAsyncThunk('user/update', updateUserApi);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    try {
      if (isTokenExists()) {
        const user = await getUserApi();
        dispatch(setUser(user.user));
      }
    } finally {
      dispatch(setIsAuthChecked(true));
    }
  }
);
