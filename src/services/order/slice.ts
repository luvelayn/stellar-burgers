import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected
} from '@reduxjs/toolkit';
import { createOrder, getOrderByNumber } from './actions';
import { TOrderState } from './type';
import {
  handleFulfilled,
  handlePending,
  handleRejected
} from '../../utils/asyncHandlers';

const initialState: TOrderState = {
  order: null,
  isLoading: false,
  error: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.error = null;
      state.order = null;
    }
  },
  selectors: {
    selectOrder: (state) => state.order,
    selectError: (state) => state.error,
    selectIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addMatcher(isFulfilled(), handleFulfilled)
      .addMatcher(isPending(), handlePending)
      .addMatcher(isRejected(), handleRejected);
  }
});

export const { clearOrder } = orderSlice.actions;
export const orderSelectors = orderSlice.selectors;
