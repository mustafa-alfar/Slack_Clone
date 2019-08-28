import React from 'react';
import { UserProivder } from './user-context';

type Props = React.PropsWithChildren<{}>;

const AppProviders = (props: Props) => <UserProivder {...props} />;

export function createCtx<A>() {
  const ctx = React.createContext<A | undefined>(undefined);
  function useCtx() {
    const c = React.useContext(ctx);
    // if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }
  return [useCtx, ctx] as [() => A, typeof ctx];
}

export default AppProviders;
