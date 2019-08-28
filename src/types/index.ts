export type User = {
  channels: Cache;
  displayName: string;
  id: string;
  photoUrl: string;
  status: { last_changed: Date; state: string };
  uid: string;
};

export interface Message {
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

export interface Channel {
  topic: string;
  id: string;
}

export interface DynamicObject {
  [key: string]: any;
}

export type DefaultProps = {
  children: React.ReactNode;
  className?: string;
  to?: string;
};
export type FormEvent = React.ChangeEventHandler<HTMLFormElement>;
