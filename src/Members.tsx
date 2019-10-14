import React from 'react';
import { useChannelId } from './Channel';
import { useCollection } from './useCollection';
import { User } from './types';
import styled from '@emotion/styled';
import { mediaQuery } from './utils';

const Members = (): JSX.Element => {
  const channelId = useChannelId();
  const where: [string, string, boolean] = React.useMemo(
    () => [`channels.${channelId}`, '==', true],
    [channelId]
  );
  const members: User[] = useCollection('users', undefined, where);
  return (
    <Layout>
      {members.sort(sortByName).map((member, index) => (
        <div key={member.id}>
          <Member>
            <Status status={member.status.state} />
            {member.displayName}
          </Member>
        </div>
      ))}
    </Layout>
  );
};

function sortByName(a: User, b: User) {
  return a.displayName > b.displayName
    ? 1
    : a.displayName < b.displayName
    ? -1
    : 0;
}

export default Members;

const Layout = styled.div`
  padding: 20px;
  border-left: solid 1px #ccc;
  flex-basis: 15%;
  min-width: 150px;

  ${mediaQuery[2]} {
    display: none;
  }
`;

const Member = styled.div`
  display: flex;
  align-items: center;
  text-transform: capitalize;
  margin-bottom: 5px;
`;

const Status: React.SFC<{ status: string }> = styled.div`
  margin-right: 5px;
  border-radius: 50%;
  height: 0.66em;
  width: 0.66em;

  background: ${props =>
    props.status === 'offline' ? 'hsl(10, 0%, 70%)' : ' hsl(110, 50%, 50%)'};
`;
