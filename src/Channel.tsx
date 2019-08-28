import React, { useRef } from 'react';
import Members from './Members';
import ChannelInfo from './ChannelInfo';
import Messages from './Messages';
import ChatInputBox from './ChatInputBox';
import { createCtx } from './context';
import { useUser } from './context/user-context';
import { db } from './firebase';
import { RouteComponentProps } from '@reach/router';

const [useChannelId, Ctx] = createCtx<string>();
export { useChannelId };

type Channel = {
  channelId?: string;
} & RouteComponentProps;

const Channel = ({ channelId = 'general' }: Channel): JSX.Element => {
  const user = useUser();
  React.useEffect(() => {
    if (user) {
      db.collection(`users`)
        .doc(user.uid)
        .update({
          [`channels.${channelId}`]: true
        });
    }
  }, [channelId, user.uid]);

  return (
    <div className="Channel">
      <Ctx.Provider value={channelId}>
        <div className="ChannelMain">
          <ChannelInfo />
          <Messages />
          <ChatInputBox />
        </div>
        <Members />
      </Ctx.Provider>
    </div>
  );
};

export default Channel;
