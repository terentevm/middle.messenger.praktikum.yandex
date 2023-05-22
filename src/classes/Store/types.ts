import { User, Chat, MessageInfo } from '../../types';

export interface IState {
  user: User;
  chatList: Chat[];
  currentChat: Chat | null;
  messages: Record<number, MessageInfo[]>;
  modalIsVisible: boolean;
}
