import { TOrder } from '@utils-types';

export type TOrderState = {
  isLoading: boolean;
  error: string | null;
  order: TOrder | null;
};
