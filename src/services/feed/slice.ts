import { TFeedState } from './type';
import { createSlice } from '@reduxjs/toolkit';
import { getFeed } from './actions';
import {
  handleFulfilled,
  handlePending,
  handleRejected
} from '../../utils/asyncHandlers';

const initialState: TFeedState = {
  orders: [],
  stats: {
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (state) => state.orders,
    selectStats: (state) => state.stats,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.fulfilled, (state, action) => {
        handleFulfilled(state);
        state.orders = action.payload.orders;
        state.stats.total = action.payload.total;
        state.stats.totalToday = action.payload.totalToday;
      })
      .addCase(getFeed.pending, handlePending)
      .addCase(getFeed.rejected, handleRejected);
  }
});

export const feedSelectors = feedSlice.selectors;
