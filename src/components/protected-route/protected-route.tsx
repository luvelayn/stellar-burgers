import React, { FC } from 'react';
import { ProtectedRouteProps } from './type';
import { useSelector } from '../../services/store';
import { userSelectors } from '../../services/user/slice';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Preloader } from '@ui';

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth = false
}): React.JSX.Element => {
  const user = useSelector(userSelectors.selectUser);
  const isAuthChecked = useSelector(userSelectors.selectIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
