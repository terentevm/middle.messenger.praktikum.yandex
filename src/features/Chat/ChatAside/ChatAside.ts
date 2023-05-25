import Handlebars from 'handlebars';
import { Component } from '../../../classes';
import { Modal } from '../../../components/modal/Modal';
import { ChatHeader } from './ChatHeader';
import { ChatSearch } from './ChatSearch';
import ChatController from '../../../controllers/ChatController';
import { withStore } from '../../../classes/Store';
import { NewChatForm } from './NewChatForm';
import { EventType } from '../../../classes/component/types';
import { ChatList } from './ChatList';

const template = `
  <aside class="chatAside">
    {{{ chatHeader }}}
    {{{ chatSearch }}}
    {{{ chatList }}}
    {{{ modalAddChat }}}
  </aside >
`;

class ChatListBase extends Component {
  constructor() {
    super();
  }

  protected init() {
    ChatController.all();
    this.children.chatHeader = new ChatHeader({
      onAddNew: this.onAddNewChat.bind(this)
    });
    this.children.chatSearch = new ChatSearch();
    this.children.chatList = new ChatList({});

    const newChatForm = new NewChatForm({
      events: { submit: this.onCreateChatSubmitHandler.bind(this) } as EventType
    });

    this.children.modalAddChat = new Modal({
      visible: false,
      content: newChatForm,
      onClose: () => {
        this.changeModalVisibility(false);
      }
    });
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), this._props);
  }

  changeModalVisibility(visible: boolean) {
    (this.children.modalAddChat as Modal).setProps({
      visible: visible
    })
  }

  onAddNewChat() {
    this.changeModalVisibility(true);
  }

  onCreateChatSubmitHandler(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.target as HTMLFormElement);
    ChatController.create(formData.get('title') as string).then(() => {
      this.changeModalVisibility(false);
      ChatController.all();
    });
  }

};

const componentWithState = withStore(state => {chatList: state.chatList})
export const ChatAside = componentWithState(ChatListBase);
