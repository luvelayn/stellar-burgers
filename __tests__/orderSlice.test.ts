import { DEFAULT_ERROR_MESSAGE } from '../src/utils/asyncHandlers';
import { TOrder } from '../src/utils/types';
import { TOrderState } from '../src/services/order/type';
import { createOrder, getOrderByNumber } from '../src/services/order/actions';
import { clearOrder, orderSlice } from '../src/services/order/slice';

describe('orderSlice reducer', () => {
  const initialState: TOrderState = {
    order: null,
    isLoading: false,
    error: null
  };

  const mockOrder: TOrder = {
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
  };

  describe('common async behavior', () => {
    it('should set isLoading to true for any pending action', () => {
      const actions = [
        { type: createOrder.pending.type },
        { type: getOrderByNumber.pending.type }
      ];

      actions.forEach((action) => {
        const state = orderSlice.reducer(initialState, action);

        expect(state.isLoading).toBe(true);
      });
    });

    it('should set isLoading to false for any fulfilled action', () => {
      const actions = [
        {
          type: createOrder.fulfilled.type,
          payload: { order: mockOrder }
        },
        {
          type: getOrderByNumber.fulfilled.type,
          payload: mockOrder
        }
      ];

      const pendingState: TOrderState = {
        ...initialState,
        isLoading: true
      };

      actions.forEach((action) => {
        const state = orderSlice.reducer(pendingState, action);
        expect(state.isLoading).toBe(false);
      });
    });

    it('should set error and isLoading to false for any rejected action', () => {
      const errorMessage = 'some error';
      const actions = [
        {
          type: createOrder.rejected.type,
          error: { message: errorMessage }
        },
        {
          type: getOrderByNumber.rejected.type,
          error: { message: errorMessage }
        }
      ];

      const pendingState: TOrderState = {
        ...initialState,
        isLoading: true
      };

      actions.forEach((action) => {
        const state = orderSlice.reducer(pendingState, action);
        expect(state.error).toBe(errorMessage);
        expect(state.isLoading).toBe(false);
        expect(state.order).toBeNull();
      });
    });

    it('should clear error when any action is pending after previous error', () => {
      const actions = [
        { type: createOrder.pending.type },
        { type: getOrderByNumber.pending.type }
      ];

      const stateWithError: TOrderState = {
        ...initialState,
        error: 'previous error'
      };

      actions.forEach((action) => {
        const state = orderSlice.reducer(stateWithError, action);
        expect(state.error).toBeNull();
        expect(state.isLoading).toBe(true);
      });
    });

    it('should set default error message when error message is undefined', () => {
      const actions = [
        { type: createOrder.rejected.type, error: {} },
        { type: getOrderByNumber.rejected.type, error: {} }
      ];

      const pendingState: TOrderState = {
        ...initialState,
        isLoading: true
      };

      actions.forEach((action) => {
        const state = orderSlice.reducer(pendingState, action);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe(DEFAULT_ERROR_MESSAGE);
      });
    });
  });

  describe('getOrderByNumber', () => {
    it('should set order when fulfilled', () => {
      const action = {
        type: getOrderByNumber.fulfilled.type,
        payload: mockOrder
      };

      const pendingState: TOrderState = {
        ...initialState,
        isLoading: true
      };

      const state = orderSlice.reducer(pendingState, action);

      expect(state.order).toEqual(mockOrder);
    });
  });

  describe('clearOrder', () => {
    it('should clear order and error', () => {
      const stateWithData: TOrderState = {
        order: mockOrder,
        error: 'some error',
        isLoading: false
      };

      const state = orderSlice.reducer(stateWithData, clearOrder());

      expect(state).toEqual(initialState);
    });
  });
});
