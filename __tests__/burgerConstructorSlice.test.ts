import { TConstructorState } from '../src/services/burgerConstructor/type';
import {
  addIngredient,
  burgerConstructorSlice,
  clearBurgerConstructor,
  moveIngredient,
  removeIngredient
} from '../src/services/burgerConstructor/slice';
import { TIngredient } from '../src/utils/types';

jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: () => 'test-id'
}));

describe('burgerConstructorSlice reducer', () => {
  const mockBun: TIngredient = {
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
  };

  const mockMainIngredient: TIngredient = {
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
  };

  const mockSauce: TIngredient = {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  };

  const initialState: TConstructorState = {
    bun: null,
    ingredients: []
  };

  const stateWithIngredients: TConstructorState = {
    bun: { ...mockBun, id: 'bun-id' },
    ingredients: [
      { ...mockMainIngredient, id: 'main-id' },
      { ...mockSauce, id: 'sauce-id' }
    ]
  };

  describe('addIngredient', () => {
    it('should add bun to empty state', () => {
      const state = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(mockBun)
      );

      expect(state.bun).toEqual({ ...mockBun, id: 'test-id' });
      expect(state.ingredients).toEqual([]);
    });

    it('should replace existing bun with new one', () => {
      const newBun = { ...mockBun, _id: 'new-bun-id' };
      const state = burgerConstructorSlice.reducer(
        stateWithIngredients,
        addIngredient(newBun)
      );

      expect(state.bun).toEqual({ ...newBun, id: 'test-id' });
      expect(state.ingredients).toEqual(stateWithIngredients.ingredients);
    });

    it('should add new ingredient to ingredients array', () => {
      const state = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(mockMainIngredient)
      );

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual({
        ...mockMainIngredient,
        id: 'test-id'
      });
      expect(state.bun).toBeNull();
    });

    it('should add multiple ingredients preserving order', () => {
      let state = burgerConstructorSlice.reducer(
        initialState,
        addIngredient(mockMainIngredient)
      );
      state = burgerConstructorSlice.reducer(state, addIngredient(mockSauce));

      expect(state.ingredients).toHaveLength(2);
      expect(state.ingredients[0]._id).toBe(mockMainIngredient._id);
      expect(state.ingredients[1]._id).toBe(mockSauce._id);
    });
  });

  describe('removeIngredient', () => {
    it('should remove ingredient by id', () => {
      const state = burgerConstructorSlice.reducer(
        stateWithIngredients,
        removeIngredient('sauce-id')
      );

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0].id).toBe('main-id');
      expect(state.bun).toEqual(stateWithIngredients.bun);
    });

    it('should not change state when removing non-existent id', () => {
      const state = burgerConstructorSlice.reducer(
        stateWithIngredients,
        removeIngredient('non-existent-id')
      );

      expect(state).toEqual(stateWithIngredients);
    });
  });

  describe('moveIngredient', () => {
    const stateForMove: TConstructorState = {
      bun: { ...mockBun, id: 'bun-id' },
      ingredients: [
        { ...mockMainIngredient, id: 'first-id', name: 'First' },
        { ...mockSauce, id: 'second-id', name: 'Second' },
        { ...mockMainIngredient, id: 'third-id', name: 'Third' }
      ]
    };

    it('should move ingredient up', () => {
      const state = burgerConstructorSlice.reducer(
        stateForMove,
        moveIngredient({ id: 'second-id', moveOption: 'up' })
      );

      expect(state.ingredients).toHaveLength(3);
      expect(state.ingredients[0].id).toBe('second-id');
      expect(state.ingredients[1].id).toBe('first-id');
      expect(state.ingredients[2].id).toBe('third-id');
    });

    it('should move ingredient down', () => {
      const state = burgerConstructorSlice.reducer(
        stateForMove,
        moveIngredient({ id: 'second-id', moveOption: 'down' })
      );

      expect(state.ingredients).toHaveLength(3);
      expect(state.ingredients[0].id).toBe('first-id');
      expect(state.ingredients[1].id).toBe('third-id');
      expect(state.ingredients[2].id).toBe('second-id');
    });

    it('should not move first ingredient up', () => {
      const state = burgerConstructorSlice.reducer(
        stateForMove,
        moveIngredient({ id: 'first-id', moveOption: 'up' })
      );

      expect(state).toEqual(stateForMove);
    });

    it('should not move last ingredient down', () => {
      const state = burgerConstructorSlice.reducer(
        stateForMove,
        moveIngredient({ id: 'third-id', moveOption: 'down' })
      );

      expect(state).toEqual(stateForMove);
    });

    it('should not change state when moving ingredient with non-existent id', () => {
      const state = burgerConstructorSlice.reducer(
        stateForMove,
        moveIngredient({ id: 'non-existent', moveOption: 'up' })
      );

      expect(state).toEqual(stateForMove);
    });

    it('should not affect bun when moving ingredients', () => {
      const state = burgerConstructorSlice.reducer(
        stateForMove,
        moveIngredient({ id: 'second-id', moveOption: 'up' })
      );

      expect(state.bun).toEqual(stateForMove.bun);
    });
  });

  describe('clearBurgerConstructor', () => {
    it('should clear all ingredients and bun', () => {
      const state = burgerConstructorSlice.reducer(
        stateWithIngredients,
        clearBurgerConstructor()
      );

      expect(state).toEqual(initialState);
    });
  });
});
