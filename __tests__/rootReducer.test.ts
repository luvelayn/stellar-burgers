import { rootReducer, RootState } from '../src/services/store';

describe('rootReducer', () => {
  const initialState: RootState = {
    ingredients: {
      ingredients: [],
      isLoading: false,
      error: null
    },
    burgerConstructor: {
      bun: null,
      ingredients: []
    },
    order: {
      order: null,
      isLoading: false,
      error: null
    },
    user: {
      user: null,
      isAuthChecked: false,
      isLoading: false,
      error: null
    },
    feed: {
      orders: [],
      stats: {
        total: 0,
        totalToday: 0
      },
      isLoading: false,
      error: null
    },
    userOrders: {
      orders: [],
      isLoading: false,
      error: null
    }
  };

  const modifiedState: RootState = {
    ...initialState,
    user: {
      user: { email: 'test@mail', name: 'test user' },
      isAuthChecked: true,
      isLoading: false,
      error: null
    }
  };

  it('should return the initial state when called with undefined', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual(initialState);
  });

  it('should return the same state when called with existing state and unknown action', () => {
    const state = rootReducer(modifiedState, { type: 'UNKNOWN' });
    expect(state).toEqual(modifiedState);
  });
});
