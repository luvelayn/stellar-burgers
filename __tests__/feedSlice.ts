import { DEFAULT_ERROR_MESSAGE } from '../src/utils/asyncHandlers';
import { TFeedState } from '../src/services/feed/type';
import { TOrder } from '../src/utils/types';
import { getFeed } from '../src/services/feed/actions';
import { feedSlice } from '../src/services/feed/slice';

describe('feedSlice reducer', () => {
  const initialStats = {
    total: 0,
    totalToday: 0
  };

  const initialState: TFeedState = {
    orders: [],
    stats: initialStats,
    isLoading: false,
    error: null
  };

  const mockOrders: TOrder[] = [
    {
      _id: '6911dbf4a64177001b31defb',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Био-марсианский метеоритный краторный бургер',
      createdAt: '2025-11-10T12:35:00.853Z',
      updatedAt: '2025-11-10T12:35:01.114Z',
      number: 93844
    },
    {
      _id: '6911d7dea64177001b31def4',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Фалленианский флюоресцентный люминесцентный бургер',
      createdAt: '2025-11-10T12:17:34.466Z',
      updatedAt: '2025-11-10T12:17:34.715Z',
      number: 93843
    }
  ];

  const mockStats = { total: 17838, totalToday: 97 };

  describe('getFeed', () => {
    it('should set isLoading to true when pending', () => {
      const action = {
        type: getFeed.pending.type
      };

      const state = feedSlice.reducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.stats).toEqual(initialStats);
      expect(state.orders).toEqual([]);
    });

    it('should set data and isLoading to false when fulfilled', () => {
      const action = {
        type: getFeed.fulfilled.type,
        payload: {
          orders: mockOrders,
          total: mockStats.total,
          totalToday: mockStats.totalToday
        }
      };

      const pendingState: TFeedState = {
        ...initialState,
        isLoading: true
      };

      const state = feedSlice.reducer(pendingState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.orders).toEqual(mockOrders);
      expect(state.stats).toEqual(mockStats);
    });

    it('should set error and isLoading to false when rejected', () => {
      const errorMessage = 'some error';
      const action = {
        type: getFeed.rejected.type,
        error: { message: errorMessage }
      };

      const pendingState: TFeedState = {
        ...initialState,
        isLoading: true
      };

      const state = feedSlice.reducer(pendingState, action);

      expect(state.error).toBe(errorMessage);
      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual([]);
      expect(state.stats).toEqual(initialStats);
    });

    it('should clear error when pending after previous error', () => {
      const action = {
        type: getFeed.pending.type
      };

      const stateWithError: TFeedState = {
        ...initialState,
        error: 'previous error'
      };

      const state = feedSlice.reducer(stateWithError, action);

      expect(state.error).toBeNull();
      expect(state.isLoading).toBe(true);
    });

    it('should set default error message when error message is undefined', () => {
      const action = {
        type: getFeed.rejected.type,
        error: {}
      };

      const pendingState: TFeedState = {
        ...initialState,
        isLoading: true
      };

      const state = feedSlice.reducer(pendingState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(DEFAULT_ERROR_MESSAGE);
    });
  });
});
