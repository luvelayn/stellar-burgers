import { PageUIProps } from '../common-type';
import { TLoginData } from '@api';

export type LoginUIProps = PageUIProps & {
  loginData: TLoginData;
};
