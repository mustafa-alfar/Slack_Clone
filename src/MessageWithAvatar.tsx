import React from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import useDocWithCache from './useDocWithCache';
import formatDate from 'date-fns/format';
import styled from '@emotion/styled';

const MessageWithAvatar = ({
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
        <Day>
          <div className="DayLine" />
          <div className="DayText">
            {formatDate(message.createdAt.seconds * 1000, 'DD/M/YYYY')}
          </div>
          <div className="DayLine" />
        </Day>
      )}

      <Message className="with-avatar">
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
          <div>{message.text}</div>
        </div>
      </Message>
    </div>
  );
};

export default MessageWithAvatar;

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

const Day = styled.div`
  display: flex;
  align-items: center;

  .DayLine {
    flex: 1;
    height: 1px;
    background: #ccc;
  }

  .DayText {
    font-weight: bold;
    padding: 10px;
    font-size: 80%;
  }
`;

const Message = styled.div`
  margin: 5px 0;
  display: flex;
  .with-avatar {
    display: flex;
    margin-top: 10px;
  }

  .Avatar {
    width: 40px;
    height: 40px;
    border-radius: 3px;
    background-size: cover;
    background-position: center center;
    background-color: #fefefe;
    background-image: url(https://placekitten.com/64/64);
  }

  .Author {
    margin-left: 8px;
    text-transform: capitalize;
  }

  .UserName {
    font-weight: bold;
    font-size: 90%;
    text-transform: capitalize;
  }

  .TimeStamp {
    color: #999;
    font-size: 80%;
  }
`;
