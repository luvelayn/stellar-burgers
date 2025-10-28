import { TUserOrdersState } from './type';
import { createSlice } from '@reduxjs/toolkit';
import { getUserOrders } from './actions';
import {
  handleFulfilled,
  handlePending,
  handleRejected
} from '../../utils/asyncHandlers';

const initialState: TUserOrdersState = {
  orders: [],
  isLoading: false,
  error: null
};

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (state) => state.orders,
    selectError: (state) => state.error,
    selectIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.fulfilled, (state, action) => {
        handleFulfilled(state);
        state.orders = action.payload.orders;
      })
      .addCase(getUserOrders.pending, handlePending)
      .addCase(getUserOrders.rejected, handleRejected);
  }
});

export const userOrdersSelectors = userOrdersSlice.selectors;
