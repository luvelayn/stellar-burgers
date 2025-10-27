import { useSelector, useDispatch } from '../../services/store';
import { selectIngredients } from '../../services/ingredients/slice';
import { getIngredients } from '../../services/ingredients/actions';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '@components';
import { BurgerConstructor } from '@components';
import { Preloader } from '@ui';
import { FC, useEffect } from 'react';

export const ConstructorPage: FC = () => {
  const { ingredients, loading, error } = useSelector(selectIngredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div style={{ margin: 'auto' }} className='text text_type_main-medium'>
        <p>Упс! Кажется, у нас пропали все ингредиенты:(</p>
        <p>Попробуйте зайти позже.</p>
      </div>
    );
  }

  return (
    <>
      <main className={styles.containerMain}>
        <h1
          className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
        >
          Соберите бургер
        </h1>
        <div className={`${styles.main} pl-5 pr-5`}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor />
        </div>
      </main>
    </>
  );
};
