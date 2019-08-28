import React from 'react';
import ReactDOM from 'react-dom';
import { useCollection } from './useCollection';
import { useChannelId } from './Channel';
import useDocWithCache from './useDocWithCache';
import formatDate from 'date-fns/format';
import isSameDay from 'date-fns/is_same_day';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { DefaultProps } from './types';

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

  return <div ref={ref} {...props} onScroll={handleScroll} />;
};
const Messages = (): JSX.Element => {
  const channelId: string = useChannelId();
  const [showModal, setShowModal] = React.useState(true);
  const messages: Message[] = useCollection(
    `channels/${channelId}/messages`,
    'createdAt'
  );

  return (
    <ChatScroller className="Messages">
      <div className="EndOfMessages">That's every message!</div>
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
            <div className="Message no-avatar">
              <div className="MessageContent">{message.text}</div>
            </div>
          </div>
        );
      })}
    </ChatScroller>
  );
};

const MessagesWithAvatar = ({
  message,
  showDate
}: {
  message: Message;
  showDate: boolean;
}) => {
  const author = useDocWithCache(message.user.path);

  return (
    <div>
      {showDate && (
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">
            {formatDate(message.createdAt.seconds * 1000, 'DD/M/YYYY')}
          </div>
          <div className="DayLine" />
        </div>
      )}

      <div className="Message with-avatar">
        <div
          className="Avatar"
          style={{ backgroundImage: author && `url(${author.photoUrl})` }}
        />
        <div className="Author">
          <div>
            <span className="UserName">{author && author.displayName} </span>
            <span className="TimeStamp">
              {distanceInWordsToNow(message.createdAt.seconds * 1000, {
                addSuffix: true,
                includeSeconds: true
              })}
            </span>
          </div>
          <div className="MessageContent">{message.text}</div>
        </div>
      </div>
    </div>
  );
};

function shouldShowAvatar(previous: Message, message: Message): boolean {
  const isFirst = !previous;
  if (isFirst) {
    return true;
  }

  const isDifferentUser = previous.user.id !== message.user.id;
  if (isDifferentUser) {
    return true;
  }

  const hasBeenAwhile =
    message.createdAt.seconds - previous.createdAt.seconds > 60;
  return hasBeenAwhile;
}

function shouldShowDate(previous: Message, message: Message): boolean {
  const isFirst = !previous;
  if (isFirst) {
    return true;
  }
  const isNewDay = !isSameDay(
    previous.createdAt.seconds * 1000,
    message.createdAt.seconds * 1000
  );
  return isNewDay;
}

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

export default Messages;
