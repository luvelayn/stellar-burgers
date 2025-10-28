import { TOrder } from '@utils-types';

export type TUserOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};
