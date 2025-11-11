import { TIngredientsState } from '../src/services/ingredients/type';
import { TIngredient } from '../src/utils/types';
import { ingredientsSlice } from '../src/services/ingredients/slice';
import { getIngredients } from '../src/services/ingredients/actions';
import { DEFAULT_ERROR_MESSAGE } from '../src/utils/asyncHandlers';

describe('ingredientsSlice reducer', () => {
  const initialState: TIngredientsState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  const mockIngredients: TIngredient[] = [
    {
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0940',
      name: 'Говяжий метеорит (отбивная)',
      type: 'main',
      proteins: 800,
      fat: 800,
      carbohydrates: 300,
      calories: 2674,
      price: 3000,
      image: 'https://code.s3.yandex.net/react/code/meat-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png'
    }
  ];

  describe('getIngredients', () => {
    it('should set isLoading to true when pending', () => {
      const action = {
        type: getIngredients.pending.type
      };

      const state = ingredientsSlice.reducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.ingredients).toEqual([]);
    });

    it('should set ingredients and isLoading to false when fulfilled', () => {
      const action = {
        type: getIngredients.fulfilled.type,
        payload: { data: mockIngredients }
      };

      const pendingState: TIngredientsState = {
        ...initialState,
        isLoading: true
      };

      const state = ingredientsSlice.reducer(pendingState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.ingredients).toEqual(mockIngredients);
    });

    it('should set error and isLoading to false when rejected', () => {
      const errorMessage = 'some error';
      const action = {
        type: getIngredients.rejected.type,
        error: { message: errorMessage }
      };

      const pendingState: TIngredientsState = {
        ...initialState,
        isLoading: true
      };

      const state = ingredientsSlice.reducer(pendingState, action);

      expect(state.error).toBe(errorMessage);
      expect(state.isLoading).toBe(false);
      expect(state.ingredients).toEqual([]);
    });

    it('should clear error when pending after previous error', () => {
      const action = {
        type: getIngredients.pending.type
      };

      const stateWithError: TIngredientsState = {
        ...initialState,
        error: 'previous error'
      };

      const state = ingredientsSlice.reducer(stateWithError, action);

      expect(state.error).toBeNull();
      expect(state.isLoading).toBe(true);
    });

    it('should set default error message when error message is undefined', () => {
      const action = {
        type: getIngredients.rejected.type,
        error: {}
      };

      const pendingState: TIngredientsState = {
        ...initialState,
        isLoading: true
      };

      const state = ingredientsSlice.reducer(pendingState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(DEFAULT_ERROR_MESSAGE);
    });
  });
});
