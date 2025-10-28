import { TOrder } from '@utils-types';
import { AsyncState } from '../../utils/asyncHandlers';

export type TUserOrdersState = {
  orders: TOrder[];
} & AsyncState;
