import { Dispatch, SetStateAction } from 'react';
import { PageUIProps } from '../common-type';

export type ResetPasswordUIProps = PageUIProps & {
  password: string;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
};
