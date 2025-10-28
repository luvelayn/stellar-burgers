import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';

export const getUserOrders = createAsyncThunk('user/getOrders', async () =>
  getOrdersApi()
);
