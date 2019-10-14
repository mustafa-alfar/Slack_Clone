import React from 'react';
import styled from '@emotion/styled';
import { useCollection } from './useCollection';
import { Link } from '@reach/router';
import { firebase, db } from './firebase';
import { useUser } from './context/user-context';
import { Channel } from './types';
import { DefaultProps } from './types';
import { mediaQuery } from './utils';

const Nav = (): JSX.Element => {
  const user = useUser();
  const channels: Array<Channel> = useCollection('channels');

  const SignOut = () => {
    firebase.auth().signOut();

    const isOfflineForFirestore = {
      state: 'offline',
      last_changed: firebase.firestore.FieldValue.serverTimestamp()
    };

    db.doc(`users/${user.uid}`).update({ status: isOfflineForFirestore });
  };
  return (
    <Navigation id="nav">
      <User>
        <img alt="whatever" src={user && user.photoUrl} />
        <div>
          <div>{user && user.displayName}</div>
          <div>
            <Button onClick={SignOut}>log out</Button>
          </div>
        </div>
      </User>
      <nav>
        {channels.map(channel => (
          <NavLink key={channel.id} to={`/channel/${channel.id}`}>
            # {channel.id}
          </NavLink>
        ))}
      </nav>
    </Navigation>
  );
};

const NavLink = (props: DefaultProps): JSX.Element => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      return {
        style: {
          textDecoration: isCurrent ? 'underline' : 'none',
          fontWeight: isCurrent ? 'bold' : 300
        }
      };
    }}
  />
);

export default Nav;

const Navigation = styled.div`
  background: #454545;
  color: #fff;
  flex-basis: 15%;
  min-width: 225px;
  display: flex;
  flex-direction: column;
  text-transform: capitalize;

  ${mediaQuery[2]} {
    min-width: 175px;
  }
  ${mediaQuery[0]} {
    position: absolute;
    top: 0;
    bottom: 0;
    transform: translateX(-160px);

    &:hover {
      transform: translateX(0);
    }
  }
`;

const User = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;

  ${mediaQuery[2]} {
    padding: 20px 2px;
  }

  img {
    border-radius: 50%;
    margin-right: 10px;
    height: 32px;
  }
`;

const Button = styled.button`
  font: inherit;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  text-decoration: underline;
  display: inline;
  cursor: pointer;
  font-size: 80%;
  color: white;
`;
