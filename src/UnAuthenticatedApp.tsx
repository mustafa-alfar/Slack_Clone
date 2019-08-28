import React, { useState } from 'react';
import { firebase } from './firebase';
import { navigate } from '@reach/router';

const UnAuthenticatedApp = (): JSX.Element => {
  return <Login />;
};

export const Login = (): JSX.Element => {
  const [authError, setAuthError] = useState<AuthError>(null);
  const handleSignInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithRedirect(provider);
      navigate('channel/general');
    } catch (err) {
      setAuthError(err);
    }
  };

  return (
    <div className="Login">
      <p>Chat App</p>
      <button onClick={handleSignInWithGoogle}>Signin with Google </button>
      {authError && (
        <div>
          <p>Sorry, there was a problem</p>
          <p>
            <i>{authError.message}</i>
          </p>
          <p>Please, try again later</p>
        </div>
      )}
    </div>
  );
};

type AuthError = {
  message: string;
} | null;

export default UnAuthenticatedApp;
