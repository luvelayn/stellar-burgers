import { PageUIProps } from '../common-type';
import { TRegisterData } from '@api';

export type RegisterUIProps = PageUIProps & {
  registerData: TRegisterData;
};
