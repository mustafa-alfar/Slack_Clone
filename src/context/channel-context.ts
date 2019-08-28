import React from 'react';

// UNUSED

const ChannelIdContext = React.createContext('');
const useChannelId = () => {
  const context = React.useContext(ChannelIdContext);
  return context;
};
const { Provider } = ChannelIdContext;

export { Provider as ChannelIdProvider, useChannelId };
