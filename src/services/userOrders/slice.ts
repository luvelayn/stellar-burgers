import { TUserOrdersState } from './type';
import { createSlice } from '@reduxjs/toolkit';
import { getUserOrders } from './actions';

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
    selectUserOrders: (state) => state.orders,
    selectUserOrdersError: (state) => state.error,
    selectIsUserOrdersLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.isLoading = false;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.error = action.error.message ?? 'Произошла неизвестная ошибка';
        state.isLoading = false;
      });
  }
});

export const {
  selectUserOrders,
  selectUserOrdersError,
  selectIsUserOrdersLoading
} = userOrdersSlice.selectors;
