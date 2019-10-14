import React from 'react';
import Nav from './Nav';
import Channel from './Channel';
import { Router, Redirect, RouteComponentProps } from '@reach/router';
import styled from '@emotion/styled';

const AuthenticatedApp = (): JSX.Element => (
  <Container>
    <Nav />
    <Router style={{ flex: 1 }}>
      <Channel path="channel/:channelId" />
      <Redirect from="/" to="channel/general" />
      <NotFound default />
    </Router>
  </Container>
);

const NotFound = (props: RouteComponentProps): JSX.Element => (
  <div className="Login">Not Found, Please try again</div>
);

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-height: 100vh;
`;

export default AuthenticatedApp;
