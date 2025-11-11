import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';
import { TConstructorState } from './type';

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingredient = action.payload;
        ingredient.type === 'bun'
          ? (state.bun = ingredient)
          : state.ingredients.push(ingredient);
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ id: string; moveOption: 'up' | 'down' }>
    ) => {
      const ingredients = state.ingredients;
      const index = ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload.id
      );

      if (index === -1) return;

      if (action.payload.moveOption === 'up' && index !== 0) {
        [ingredients[index], ingredients[index - 1]] = [
          ingredients[index - 1],
          ingredients[index]
        ];
      } else if (
        action.payload.moveOption === 'down' &&
        index !== ingredients.length - 1
      ) {
        [ingredients[index], ingredients[index + 1]] = [
          ingredients[index + 1],
          ingredients[index]
        ];
      }
    },
    clearBurgerConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    selectBurgerConstructor: (state) => state
  }
});

export const {
  addIngredient,
  removeIngredient,
  clearBurgerConstructor,
  moveIngredient
} = burgerConstructorSlice.actions;
export const { selectBurgerConstructor } = burgerConstructorSlice.selectors;
