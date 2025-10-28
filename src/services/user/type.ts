import { TUser } from '@utils-types';
import { AsyncState } from '../../utils/asyncHandlers';

export type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
} & AsyncState;
