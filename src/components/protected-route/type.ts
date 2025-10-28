import React from 'react';

export type ProtectedRouteProps = {
  children: React.JSX.Element;
  onlyUnAuth?: boolean;
};
