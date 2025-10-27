import { createSlice } from '@reduxjs/toolkit';
import { createOrder } from './actions';
import { TOrderState } from './type';

const initialState: TOrderState = {
  request: false,
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
    selectOrder: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message ?? 'Произошла неизвестная ошибка';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.request = false;
        state.order = action.payload.order;
        console.log(action.payload.name);
        console.log(action.payload.order);
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export const { selectOrder } = orderSlice.selectors;
