import React, { useRef } from 'react';
import styled from '@emotion/styled';
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
    <Channels>
      <Ctx.Provider value={channelId}>
        <MainChannel>
          <ChannelInfo />
          <Messages />
          <ChatInputBox />
        </MainChannel>
        <Members />
      </Ctx.Provider>
    </Channels>
  );
};

export default Channel;

const Channels = styled.div`
  flex: 1;
  flex-grow: 1;
  display: flex;
`;

const MainChannel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 350px;
`;
