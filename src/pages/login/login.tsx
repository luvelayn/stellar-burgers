import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../services/user/actions';
import {
  selectIsAuthRequest,
  selectUserError
} from '../../services/user/slice';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const error = useSelector(selectUserError);
  const isAuthRequest = useSelector(selectIsAuthRequest);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  if (isAuthRequest) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={error ? 'Ошибка авторизации' : ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
