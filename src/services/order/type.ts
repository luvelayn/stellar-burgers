import { TOrder } from '@utils-types';
import { AsyncState } from '../../utils/asyncHandlers';

export type TOrderState = {
  order: TOrder | null;
} & AsyncState;
