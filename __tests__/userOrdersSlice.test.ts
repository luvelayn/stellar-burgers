import { DEFAULT_ERROR_MESSAGE } from '../src/utils/asyncHandlers';
import { TOrder } from '../src/utils/types';
import { TUserOrdersState } from '../src/services/userOrders/type';
import { getUserOrders } from '../src/services/userOrders/actions';
import { userOrdersSlice } from '../src/services/userOrders/slice';

describe('userOrdersSlice reducer', () => {
  const initialState: TUserOrdersState = {
    orders: [],
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

  describe('getUserOrders', () => {
    it('should set isLoading to true when pending', () => {
      const action = {
        type: getUserOrders.pending.type
      };

      const state = userOrdersSlice.reducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.orders).toEqual([]);
    });

    it('should set orders and isLoading to false when fulfilled', () => {
      const action = {
        type: getUserOrders.fulfilled.type,
        payload: {
          orders: mockOrders
        }
      };

      const pendingState: TUserOrdersState = {
        ...initialState,
        isLoading: true
      };

      const state = userOrdersSlice.reducer(pendingState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.orders).toEqual(mockOrders);
    });

    it('should set error and isLoading to false when rejected', () => {
      const errorMessage = 'some error';
      const action = {
        type: getUserOrders.rejected.type,
        error: { message: errorMessage }
      };

      const pendingState: TUserOrdersState = {
        ...initialState,
        isLoading: true
      };

      const state = userOrdersSlice.reducer(pendingState, action);

      expect(state.error).toBe(errorMessage);
      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual([]);
    });

    it('should clear error when pending after previous error', () => {
      const action = {
        type: getUserOrders.pending.type
      };

      const stateWithError: TUserOrdersState = {
        ...initialState,
        error: 'previous error'
      };

      const state = userOrdersSlice.reducer(stateWithError, action);

      expect(state.error).toBeNull();
      expect(state.isLoading).toBe(true);
    });

    it('should set default error message when error message is undefined', () => {
      const action = {
        type: getUserOrders.rejected.type,
        error: {}
      };

      const pendingState: TUserOrdersState = {
        ...initialState,
        isLoading: true
      };

      const state = userOrdersSlice.reducer(pendingState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(DEFAULT_ERROR_MESSAGE);
    });
  });
});
