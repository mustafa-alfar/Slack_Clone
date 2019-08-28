import React from 'react';
import { useChannelId } from './Channel';
import useDoc from './useDoc';

const ChannelInfo = (): JSX.Element => {
  const channelId = useChannelId();

  const { topic }: { topic: string } = useDoc(`channels/${channelId}`, 'topic');

  return (
    <div className="ChannelInfo">
      <div className="Topic">
        Topic: <input className="TopicInput" defaultValue={topic} />
      </div>
      <div className="ChannelName">#{channelId}</div>
    </div>
  );
};

export default ChannelInfo;
