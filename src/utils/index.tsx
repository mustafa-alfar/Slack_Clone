import isSameDay from 'date-fns/is_same_day';

export function shouldShowAvatar(previous: Message, message: Message): boolean {
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

export function shouldShowDate(previous: Message, message: Message): boolean {
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

const breakpoints = [576, 768, 992, 1200];
const mediaQuery = breakpoints.map(bp => `@media (max-width: ${bp}px)`);

export { mediaQuery };

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
