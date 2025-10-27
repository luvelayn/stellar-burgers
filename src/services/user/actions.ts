import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  isTokenExists,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { setIsAuthChecked, setUser } from './slice';

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => loginUserApi(data)
);

export const logoutUser = createAsyncThunk('user/logout', async () =>
  logoutApi()
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => registerUserApi(data)
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

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
