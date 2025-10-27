import { TFeedState } from './type';
import { createSlice } from '@reduxjs/toolkit';
import { getFeed } from './actions';

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
    selectFeedOrders: (state) => state.orders,
    selectFeedStats: (state) => state.stats,
    selectIsFeedLoading: (state) => state.isLoading,
    selectFeedError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.stats.total = action.payload.total;
        state.stats.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.error = action.error.message ?? 'Произошла неизвестная ошибка';
        state.isLoading = false;
      });
  }
});

export const {
  selectFeedOrders,
  selectFeedStats,
  selectIsFeedLoading,
  selectFeedError
} = feedSlice.selectors;
