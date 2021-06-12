import { AuthContext } from 'providers/AuthProvider';
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ component: RouteComponent, path, ...rest }: any) {
  const { authenticated, loadingAuthState } = useContext(AuthContext);
  if (loadingAuthState) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <Route
      {...rest}
      render={routeProps =>
        authenticated ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={{ pathname: '/auth/login', state: { prevPath: path } }} />
        )
      }
    />
  );
}
