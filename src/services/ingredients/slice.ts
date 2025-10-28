import { createSlice } from '@reduxjs/toolkit';
import { getIngredients } from './actions';
import { TIngredientsState } from './type';
import {
  handleFulfilled,
  handlePending,
  handleRejected
} from '../../utils/asyncHandlers';

const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectError: (state) => state.error,
    selectIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state, action) => {
        handleFulfilled(state);
        state.ingredients = action.payload.data;
      })
      .addCase(getIngredients.pending, handlePending)
      .addCase(getIngredients.rejected, handleRejected);
  }
});

export const ingredientsSelectors = ingredientsSlice.selectors;
