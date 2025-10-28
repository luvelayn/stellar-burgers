import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { userOrdersSelectors } from '../../services/userOrders/slice';
import { Preloader } from '@ui';
import { getUserOrders } from '../../services/userOrders/actions';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(userOrdersSelectors.selectOrders);
  const isLoading = useSelector(userOrdersSelectors.selectIsLoading);
  const error = useSelector(userOrdersSelectors.selectError);

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div style={{ margin: 'auto' }} className='text text_type_main-medium'>
        <p>Упс! Сейчас мы не можем загрузить все Ваши заказы:(</p>
        <p>Попробуйте зайти позже.</p>
      </div>
    );
  }

  return <ProfileOrdersUI orders={orders} />;
};
