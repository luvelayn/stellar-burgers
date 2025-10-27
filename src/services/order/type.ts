import { TOrder } from '@utils-types';

export type TOrderState = {
  request: boolean;
  error: string | null;
  order: TOrder | null;
};
