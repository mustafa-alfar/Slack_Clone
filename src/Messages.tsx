import React from 'react';
import styled from '@emotion/styled';
import { useCollection } from './useCollection';
import { useChannelId } from './Channel';
import { DefaultProps } from './types';
import MessagesWithAvatar from './MessageWithAvatar';
import { shouldShowAvatar, shouldShowDate } from './utils';

const ChatScroller = (props: DefaultProps) => {
  const ref = React.useRef<HTMLDivElement>(null!);
  const shouldScroll = React.useRef(true);

  React.useLayoutEffect(() => {
    if (shouldScroll.current) {
      const node = ref.current;
      node.scrollTop = node.scrollHeight;
    }
  });

  const handleScroll = (e: React.FormEvent<any>) => {
    const node = ref.current;
    const { scrollTop, scrollHeight, offsetHeight } = node;
    shouldScroll.current = scrollTop + offsetHeight === scrollHeight;
  };

  return <MessageList ref={ref} {...props} onScroll={handleScroll} />;
};
const Messages = (): JSX.Element => {
  const channelId: string = useChannelId();
  const messages: Message[] = useCollection(
    `channels/${channelId}/messages`,
    'createdAt'
  );

  return (
    <ChatScroller>
      <MessageEnd>That's every message!</MessageEnd>
      {messages.map((message, index) => {
        const previousMessage = messages[index - 1];
        const showAvatar = shouldShowAvatar(previousMessage, message);
        const showDate = shouldShowDate(previousMessage, message);

        return showAvatar ? (
          <MessagesWithAvatar
            key={message.id}
            message={message}
            showDate={showDate}
          />
        ) : (
          <div key={message.id}>
            <Message className="no-avatar">
              <div>{message.text}</div>
            </Message>
          </div>
        );
      })}
    </ChatScroller>
  );
};

export default Messages;

interface Message {
  createdAt: {
    seconds: number;
  };
  id: string;
  text: string;
  user: {
    path: string;
    id: string;
  };
}

const MessageList = styled.div`
  flex: 1;
  padding: 10px 20px 10px 20px;
  line-height: 1.3;
  max-height: calc(100vh - 109px);
  overflow: auto;
`;

const MessageEnd = styled.div`
  text-align: center;
  color: hsl(200, 50%, 50%);
  padding: 5px;
`;

const Message = styled.div`
  display: flex;

  margin-left: 50px;
`;
