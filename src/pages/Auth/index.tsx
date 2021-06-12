import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from 'pages/Auth/Login';
import Register from 'pages/Auth/Register';
import ResetPassword from 'pages/Auth/ResetPassword';

export default function Auth() {
  return (
    <div className="min-h-screen w-full bg-white flex">
      <Switch>
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/register" component={Register} />
        <Route exact path="/auth/reset-password" component={ResetPassword} />
        <Redirect to="/auth/login" from="/auth" />
      </Switch>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  );
}
