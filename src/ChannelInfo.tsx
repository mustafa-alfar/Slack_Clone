import React from 'react';
import { useChannelId } from './Channel';
import useDoc from './useDoc';
import styled from '@emotion/styled';

const ChannelInfo = (): JSX.Element => {
  const channelId = useChannelId();

  const { topic }: { topic: string } = useDoc(`channels/${channelId}`, 'topic');

  return (
    <Information>
      <div>
        Topic: <input defaultValue={topic} />
      </div>
      <div>#{channelId}</div>
    </Information>
  );
};

export default ChannelInfo;

const Information = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  font-weight: bold;
  border-bottom: solid 1px #ccc;

  input {
    border: 1px solid transparent;
    &:hover {
      border-color: #ccc;
    }
  }
`;
