import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected
} from '@reduxjs/toolkit';
import { createOrder, getOrderByNumber } from './actions';
import { TOrderState } from './type';

const initialState: TOrderState = {
  isLoading: false,
  error: null,
  order: null
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
    selectOrderError: (state) => state.error,
    selectIsOrderLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addMatcher(isFulfilled(), (state) => {
        state.isLoading = false;
      })
      .addMatcher(isPending(), (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isRejected(), (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Произошла неизвестная ошибка';
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export const { selectOrder, selectOrderError, selectIsOrderLoading } =
  orderSlice.selectors;
