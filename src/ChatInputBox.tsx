import React from 'react';
import { db } from './firebase';
import { useUser } from './context/user-context';
import { useChannelId } from './Channel';
import { FormEvent } from './types';
import styled from '@emotion/styled';

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
    <FormLayout onSubmit={handleSubmit}>
      <input
        placeholder="Message #general"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
    </FormLayout>
  );
};

const FormLayout = styled.form`
  padding: 0px 20px 20px 20px;

  input {
    box-sizing: border-box;
    font: inherit;
    width: 100%;
    padding: 8px;
    border: solid 2px;
    border-color: #aaa;
    border-radius: 6px;
    outline: none;

    &:focus {
      border-color: #666;
    }
  }
`;

export default ChatInputBox;
