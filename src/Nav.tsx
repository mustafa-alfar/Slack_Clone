import React from 'react';
import { useCollection } from './useCollection';
import { Link } from '@reach/router';
import { firebase, db } from './firebase';
import { useUser } from './context/user-context';
import { Channel } from './types';
import { DefaultProps } from './types';

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
    <div className="Nav" id="nav">
      <div className="User">
        <img className="UserImage" alt="whatever" src={user && user.photoUrl} />
        <div>
          <div>{user && user.displayName}</div>
          <div>
            <button onClick={SignOut} className="text-button">
              log out
            </button>
          </div>
        </div>
      </div>
      <nav className="ChannelNav">
        {channels.map(channel => (
          <NavLink key={channel.id} to={`/channel/${channel.id}`}>
            # {channel.id}
          </NavLink>
        ))}
      </nav>
    </div>
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
