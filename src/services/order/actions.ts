import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';

export const createOrder = createAsyncThunk(
  'order/create',
  async (data: string[]) => orderBurgerApi(data)
);
