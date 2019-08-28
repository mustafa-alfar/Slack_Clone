import React from 'react';
import { useChannelId } from './Channel';
import { useCollection } from './useCollection';
import { User } from './types';

const Members = (): JSX.Element => {
  const channelId = useChannelId();
  const where: [string, string, boolean] = React.useMemo(
    () => [`channels.${channelId}`, '==', true],
    [channelId]
  );
  const members: User[] = useCollection('users', undefined, where);
  return (
    <div className="Members">
      {members.sort(sortByName).map((member, index) => (
        <div key={member.id}>
          <div className="Member">
            <div
              className={`MemberStatus ${
                member.status ? member.status.state : 'offline'
              }`}
            />
            {member.displayName}
          </div>
        </div>
      ))}
    </div>
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
