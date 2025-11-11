import { DEFAULT_ERROR_MESSAGE } from '../src/utils/asyncHandlers';
import { TUser } from '../src/utils/types';
import { TUserState } from '../src/services/user/type';
import {
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '../src/services/user/actions';
import {
  setIsAuthChecked,
  setUser,
  userSlice
} from '../src/services/user/slice';

describe('userSlice reducer', () => {
  const initialState: TUserState = {
    user: null,
    isAuthChecked: false,
    error: null,
    isLoading: false
  };

  const mockUser: TUser = {
    email: 'test@mail',
    name: 'test name'
  };

  describe('common async behavior', () => {
    it('should set isLoading to true for any pending action', () => {
      const actions = [
        { type: logoutUser.pending.type },
        { type: updateUser.pending.type },
        { type: loginUser.pending.type },
        { type: registerUser.pending.type }
      ];

      actions.forEach((action) => {
        const state = userSlice.reducer(initialState, action);

        expect(state.isLoading).toBe(true);
      });
    });

    it('should set isLoading to false for any fulfilled action', () => {
      const actions = [
        { type: logoutUser.fulfilled.type },
        {
          type: updateUser.fulfilled.type,
          payload: { user: mockUser }
        },
        {
          type: loginUser.fulfilled.type,
          payload: { user: mockUser }
        },
        {
          type: registerUser.fulfilled.type,
          payload: { user: mockUser }
        }
      ];

      const pendingState: TUserState = {
        ...initialState,
        isLoading: true
      };

      actions.forEach((action) => {
        const state = userSlice.reducer(pendingState, action);
        expect(state.isLoading).toBe(false);
      });
    });

    it('should set error and isLoading to false for any rejected action', () => {
      const errorMessage = 'some error';
      const actions = [
        {
          type: logoutUser.rejected.type,
          error: { message: errorMessage }
        },
        {
          type: updateUser.rejected.type,
          error: { message: errorMessage }
        },
        {
          type: loginUser.rejected.type,
          error: { message: errorMessage }
        },
        {
          type: registerUser.rejected.type,
          error: { message: errorMessage }
        }
      ];

      const pendingState: TUserState = {
        ...initialState,
        isLoading: true
      };

      actions.forEach((action) => {
        const state = userSlice.reducer(pendingState, action);
        expect(state.error).toBe(errorMessage);
        expect(state.isLoading).toBe(false);
        expect(state.user).toBeNull();
        expect(state.isAuthChecked).toBe(false);
      });
    });

    it('should clear error when any action is pending after previous error', () => {
      const actions = [
        { type: logoutUser.pending.type },
        { type: updateUser.pending.type },
        { type: loginUser.pending.type },
        { type: registerUser.pending.type }
      ];

      const stateWithError: TUserState = {
        ...initialState,
        error: 'previous error'
      };

      actions.forEach((action) => {
        const state = userSlice.reducer(stateWithError, action);
        expect(state.error).toBeNull();
        expect(state.isLoading).toBe(true);
      });
    });

    it('should set default error message when error message is undefined', () => {
      const actions = [
        { type: logoutUser.rejected.type, error: {} },
        { type: updateUser.rejected.type, error: {} },
        { type: loginUser.rejected.type, error: {} },
        { type: registerUser.rejected.type, error: {} }
      ];

      const pendingState: TUserState = {
        ...initialState,
        isLoading: true
      };

      actions.forEach((action) => {
        const state = userSlice.reducer(pendingState, action);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe(DEFAULT_ERROR_MESSAGE);
      });
    });
  });

  describe('logoutUser', () => {
    it('should reset user', () => {
      const action = {
        type: logoutUser.fulfilled.type
      };

      const pendingState: TUserState = {
        ...initialState,
        isLoading: true
      };

      const state = userSlice.reducer(pendingState, action);

      expect(state.user).toBeNull();
    });
  });

  describe('updateUser', () => {
    it('should update user fields', () => {
      const newUser = {
        name: 'new test name',
        email: 'newTest@email'
      };

      const action = {
        type: updateUser.fulfilled.type,
        payload: { user: newUser }
      };

      const stateWithData: TUserState = {
        ...initialState,
        isAuthChecked: true,
        user: { ...mockUser }
      };

      const state = userSlice.reducer(stateWithData, action);

      expect(state.user).toEqual(newUser);
    });
  });

  describe('loginUser', () => {
    it('should set user', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: { user: mockUser }
      };

      const state = userSlice.reducer(initialState, action);

      expect(state.user).toEqual(mockUser);
    });
  });

  describe('registerUser', () => {
    it('should set user', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: { user: mockUser }
      };

      const state = userSlice.reducer(initialState, action);

      expect(state.user).toEqual(mockUser);
    });
  });

  describe('setUser', () => {
    it('should set user', () => {
      const state = userSlice.reducer(initialState, setUser(mockUser));
      expect(state.user).toEqual(mockUser);
    });

    it('should reset user if called with null', () => {
      const state = userSlice.reducer(initialState, setUser(null));
      expect(state.user).toBeNull();
    });
  });

  describe('setIsAuthChecked', () => {
    it('should set isAuthChecked', () => {
      const state = userSlice.reducer(initialState, setIsAuthChecked(true));
      expect(state.isAuthChecked).toBe(true);
    });
  });
});
