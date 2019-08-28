import React, { FunctionComponent } from 'react';
import Nav from './Nav';
import Channel from './Channel';
import { Router, Redirect, RouteComponentProps } from '@reach/router';

const AuthenticatedApp = (): JSX.Element => (
  <div className="App">
    <Nav />
    <Router>
      <Channel path="channel/:channelId" />
      <Redirect from="/" to="channel/general" />
      <NotFound default />
    </Router>
  </div>
);

const NotFound = (props: RouteComponentProps): JSX.Element => (
  <div className="Login">Not Found, Please try again</div>
);

export default AuthenticatedApp;
