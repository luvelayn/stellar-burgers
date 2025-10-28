import { TIngredient } from '@utils-types';
import { AsyncState } from '../../utils/asyncHandlers';

export type TIngredientsState = {
  ingredients: TIngredient[];
} & AsyncState;
