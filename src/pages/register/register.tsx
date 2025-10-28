import { FC, SyntheticEvent } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { registerUser } from '../../services/user/actions';
import { userSelectors } from '../../services/user/slice';
import { Preloader } from '@ui';
import { useForm } from '../../hooks/useForm';
import { TRegisterData } from '@api';

export const Register: FC = () => {
  const { values, handleChange } = useForm<TRegisterData>({
    name: '',
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const error = useSelector(userSelectors.selectError);
  const isLoading = useSelector(userSelectors.selectIsLoading);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser(values));
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText={error ? 'Ошибка регистрации' : ''}
      registerData={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
