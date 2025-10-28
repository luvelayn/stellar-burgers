import { FC, SyntheticEvent } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../services/user/actions';
import { userSelectors } from '../../services/user/slice';
import { Preloader } from '@ui';
import { useForm } from '../../hooks/useForm';
import { TLoginData } from '@api';

export const Login: FC = () => {
  const { values, handleChange } = useForm<TLoginData>({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const error = useSelector(userSelectors.selectError);
  const isLoading = useSelector(userSelectors.selectIsLoading);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser(values));
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={error ? 'Ошибка авторизации' : ''}
      loginData={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
