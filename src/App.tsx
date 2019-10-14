import React, { lazy, Suspense, useEffect } from 'react';
import { useUser } from './context/user-context';
const loadAuthenticatedApp = () => import('./AuthenticatedApp');
const AuthenticatedApp = lazy(loadAuthenticatedApp);
const UnAuthenticatedApp = lazy(() => import('./UnAuthenticatedApp'));

const App = (): JSX.Element => {
  useEffect(() => {
    // pre-load the authenticated side in the background while the user's
    // filling out the login form..
    loadAuthenticatedApp();
  }, []);

  const user = useUser();

  return (
    <Suspense fallback={<div>...loading</div>}>
      {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </Suspense>
  );
};

export default App;
