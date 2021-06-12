import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Container from 'components/Container';
import Sidebar from 'components/Sidebar';
import Home from './Main';

export default function Dashboard() {
  return (
    <Container>
      <Sidebar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
    </Container>
  );
}
