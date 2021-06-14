export interface ICurrencyOption {
  label: string;
  value: string;
  description: string;
  icon: any;
  hasFixed: boolean;
}

export type CurrentBlock = 'exchange' | 'checkout' | 'details';

export interface IUser {
  _id: string;
  email: string;
  password?: string;
  role: 'admin' | 'operator' | 'client';
  firstName: string;
  lastName: string;
  isOnline: boolean;
  avatarId: string;
  avatar?: IUpload;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCredentials {
  email: string;
  password: string;
}
export interface IChat {
  _id: string;
  clientId: string;
  operatorId: string;
  lastMessage: Message;
  lastMessageDate: Date;
  clientUnreadMessages: number;
  operatorUnreadMessages: number;
  client: IUser;
  operator: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage {
  _id: string;
  text: string;
  type: 'text' | 'photo' | 'call';
  isRead: boolean;
  authorRole: 'admin' | 'operator' | 'client';
  photosIds: string[];
  photos: IUpload[];
  chatId: string;
  userId: string;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpload {
  _id: string;
  originalname: string;
  filename: string;
  mimetype?: string;
  path?: string;
  createdAt: Date;
  updatedAt: Date;
}
