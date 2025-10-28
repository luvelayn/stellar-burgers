import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { feedSelectors } from '../../services/feed/slice';
import { getFeed } from '../../services/feed/actions';

export const Feed: FC = () => {
  const orders = useSelector(feedSelectors.selectOrders);
  const isLoading = useSelector(feedSelectors.selectIsLoading);
  const error = useSelector(feedSelectors.selectError);

  const dispatch = useDispatch();

  const handleGetFeeds = () => {
    dispatch(getFeed());
  };

  useEffect(() => {
    handleGetFeeds();
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div style={{ margin: 'auto' }} className='text text_type_main-medium'>
        <p>Упс! Кажется, у нас пропали все заказы:(</p>
        <p>Попробуйте зайти позже.</p>
      </div>
    );
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
