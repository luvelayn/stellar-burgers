import { TUser } from '@utils-types';

export type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  error: string | null;
  isAuthRequest: boolean;
};
