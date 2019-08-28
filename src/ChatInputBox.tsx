import React from 'react';
import { db } from './firebase';
import { useUser } from './context/user-context';
import { useChannelId } from './Channel';
import { FormEvent } from './types';

const ChatInputBox = (): JSX.Element => {
  const [message, setMessage] = React.useState('');
  const channelId: string = useChannelId();

  const user = useUser();

  const handleSubmit: FormEvent = e => {
    e.preventDefault();
    if (message.length > 0) {
      db.collection(`channels/${channelId}/messages`).add({
        user: db.collection('users').doc(user.uid),
        text: message,
        createdAt: new Date()
      });

      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ChatInputBox">
      <input
        className="ChatInput"
        placeholder="Message #general"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
    </form>
  );
};

export default ChatInputBox;
