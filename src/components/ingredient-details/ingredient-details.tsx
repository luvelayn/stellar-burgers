import { FC } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { ingredientsSelectors } from '../../services/ingredients/slice';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredients = useSelector(ingredientsSelectors.selectIngredients);

  const ingredientData =
    ingredients.find((ingredient) => ingredient._id === id) || null;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
