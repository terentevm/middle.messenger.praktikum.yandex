import { Component } from '../../../../classes';
import { IChatList } from './types';
import { withStore } from '../../../../classes/Store';
import { Chat } from '../../../../types';
import { store } from '../../../../classes/Store';
import { StoreEvents } from '../../../../classes/Store/Store';
import { ChatElement } from '../ChatElement';
import { EventType } from '../../../../classes/component/types';

const template = `
  <ul class="chatList">
    {{{ listElements }}}
  </ul>
`;

class ChatListBase extends Component<IChatList & {chatList: Chat[], currentChat: Chat | null}> {
  constructor(props: IChatList & {chatList: Chat[], currentChat: Chat | null} ) {
    super(props);
  }


  protected render(): DocumentFragment {
    return this.renderTemplate(template, this._props);
  }

  protected init() {
    this.updateListElements();

    store.on(StoreEvents.Updated, () => {
      this._props.chatList = store.getState().chatList;
    })
  }

  protected componentDidUpdate(_oldProps?: IChatList & { chatList: Chat[], currentChat: Chat | null }, _newProps?: IChatList & { chatList: Chat[] , currentChat: Chat | null}): boolean {
    this.updateListElements();
    return true
  }

  updateListElements() {

    if (this._props.chatList) {
      this.children.listElements = [...this._props.chatList].map((item: Chat) => {

        return (new ChatElement({
          ...item,
          isActive: this._props.currentChat?.id === item.id,
          events: {
           click: () => {
             console.log(`set current chat ${item}`);
             store.updateState({
               ...store.getState(),
               currentChat: item
             });
           }
          } as EventType
        }));
      }) ;
    }

  }
}

const componentWithStore = withStore<{chatList: Chat[], currentChat: Chat | null}>(props => ({
  chatList: props.chatList,
  currentChat: props.currentChat,
}));

export const ChatList = componentWithStore<IChatList>(ChatListBase)
