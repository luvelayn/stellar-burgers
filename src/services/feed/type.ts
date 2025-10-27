import { TOrder } from '@utils-types';

export type TFeedState = {
  orders: TOrder[];
  stats: {
    total: number;
    totalToday: number;
  };
  isLoading: boolean;
  error: string | null;
};
