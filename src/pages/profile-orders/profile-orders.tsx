import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectIsUserOrdersLoading,
  selectUserOrders,
  selectUserOrdersError
} from '../../services/userOrders/slice';
import { Preloader } from '@ui';
import { getUserOrders } from '../../services/userOrders/actions';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const isLoading = useSelector(selectIsUserOrdersLoading);
  const error = useSelector(selectUserOrdersError);

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
