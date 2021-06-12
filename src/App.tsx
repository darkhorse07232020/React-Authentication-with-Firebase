import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import Auth from 'pages/Auth';
import ProfileWizard from 'pages/ProfileWizard';
import Dashboard from 'pages/Dashboard';
import { AuthProvider } from 'providers/AuthProvider';
import { ToastContainer } from 'react-toast';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/profile-wizard" component={ProfileWizard} />
          <Route path="/auth" component={Auth} />
          <Redirect to="/auth" from="/" />
        </Switch>
      </BrowserRouter>
      <ToastContainer delay={3000} position="top-right" />
    </AuthProvider>
  );
}

export default App;
