import React, { useEffect, useState } from 'react';
import { firebase, db, setupPresence } from '../firebase';
import { createCtx } from './index';

interface User {
  displayName: string;
  photoUrl: string;
  uid: string;
}

type Props = React.PropsWithChildren<{}>;

const [useUser, ctx] = createCtx<User>();

const UserProivder = (props: Props) => {
  const user = useAuth();

  return <ctx.Provider value={user} {...props} />;
};

const useAuth = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const user = {
          displayName: firebaseUser.displayName,
          photoUrl: firebaseUser.photoURL,
          uid: firebaseUser.uid
        };

        setUser(user);

        db.collection('users')
          .doc(user.uid)
          .set(user, { merge: true });

        setupPresence(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  return user;
};

export { UserProivder, useUser };
