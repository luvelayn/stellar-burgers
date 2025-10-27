import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { clearOrder, selectOrder } from '../../services/order/orderSlice';
import { createOrder } from '../../services/order/actions';
import {
  clearBurgerConstructor,
  selectBurgerConstructor
} from '../../services/burgerConstructor/slice';
import { selectUser } from '../../services/user/slice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(selectBurgerConstructor);
  const { request, error, order } = useSelector(selectOrder);
  const user = useSelector(selectUser);

  const onOrderClick = () => {
    if (!constructorItems.bun || request) return;

    if (!user) {
      navigate('/login');
      return;
    }

    dispatch(
      createOrder([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id)
      ])
    );
  };
  const closeOrderModal = () => {
    dispatch(clearBurgerConstructor());
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={request}
      constructorItems={constructorItems}
      orderModalData={order}
      orderError={error}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
