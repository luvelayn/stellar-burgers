import { TIngredient } from '@utils-types';

export type ConstructorPageUIProps = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};
