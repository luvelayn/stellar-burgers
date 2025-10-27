import { TIngredient } from '@utils-types';

export type TIngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};
