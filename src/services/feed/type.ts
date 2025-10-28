import { TOrder } from '@utils-types';
import { AsyncState } from '../../utils/asyncHandlers';

export type TFeedState = {
  orders: TOrder[];
  stats: {
    total: number;
    totalToday: number;
  };
} & AsyncState;
