import { ComponentPropType } from '../../../../classes/component/types';
import { Chat } from '../../../../types';

export interface IChatList extends ComponentPropType {
  list: Chat[];
  onChatSelect: (chat: Chat) => void;
}
