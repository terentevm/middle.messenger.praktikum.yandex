import Handlebars from 'handlebars';
import { Component } from '../../../classes';
import { Messages } from './Messages';
import { store, withStore } from '../../../classes/Store';
import ChatController from '../../../controllers/ChatController';
import MessageController from '../../../controllers/MessageController';
import { StoreEvents } from '../../../classes/Store/Store';
import { Chat } from '../../../types';
import { BaseInput } from '../../../components/input/BaseInput';
import { PrimaryButton } from '../../../components/button/Button';
import  { Divider } from '../../../components/divider';
import { ArrowRight } from '../../../icons';
import { Header } from './Header';

const template = `
  <main class="messanger">
    {{#if currentChat}}
      {{{ Header }}}
      {{{ Divider1 }}}
      {{{ Messages }}}
      {{{ Divider2 }}}
      <form class="messanger__message">
        {{{ inputMsg }}}
        {{{ buttonSend }}}
      </form>
    {{else}}
      <div class="messanger__notSelected">
        <p class="messanger__notSelectedText">Выберите чат чтобы отправить сообщение </p>
      </div>
      
    {{/if}}
  </main>
`;

class ChatContentBase extends Component {
  constructor(props: any) {
    super(props);
  }

  protected init() {
    const { currentChat } = this._props;
    store.on(StoreEvents.Updated, () => {
      console.log(`state has been changed`);

      const newState = store.getState();
      this.setProps(newState);
      //this.setChatMessages(newState.currentChat);
    })

    if (currentChat) {
     this.setChat(currentChat);
    }
    this.children.Header = new Header({});
    this.children.Divider1 = new Divider();
    this.children.Messages = new Messages({messages: [], user: this._props.user});
    this.children.Divider2 = new Divider();

    this.children.inputMsg = new BaseInput({
      id: 'msg_input',
      name: 'msg_input',
      placeholder: 'Cообщение',
      type: 'text',
      className: 'messageInput'
    });

    const btnIcon = new ArrowRight({color: '#FFFFFF'});
    this.children.buttonSend = new PrimaryButton({
      type: 'submit',
      icon: btnIcon,
      className: 'btn_rounded'
    });

    this._props.events = {
      submit: this.sendMessage.bind(this)
    }
  }

  protected componentDidUpdate(oldProps?: any, newProps?: any): boolean {

    const oldChatId = oldProps.currentChat?.id || undefined;
    const newChatId = newProps.currentChat?.id || undefined;

    if (oldChatId !==  newChatId) {
      if (oldChatId) {
        console.log(`Закрыть соединение с чатом ${newProps.currentChat.id}`);
        MessageController.onClose(oldChatId);
      }

      console.log(`Устанавливаем новый чат ${newProps.currentChat.id}`);
      this.setChat(newProps.currentChat);
    }

    //перерисовка сообщений

    if (newProps.currentChat && newProps.messages) {
      const _messagesOld = oldProps.messages && Array.isArray(oldProps.messages[oldProps.currentChat.id]) ? oldProps.messages[oldProps.currentChat.id] : [];
      const _messagesNew = newProps.messages&& Array.isArray(newProps.messages[newProps.currentChat.id]) ? newProps.messages[newProps.currentChat.id] : [];

      if (_messagesNew.length !== _messagesOld.length) {
        console.log('Need to rerender messages');
        console.log(_messagesOld);
        console.log(_messagesNew);
        console.log(this._props);
        (this.children.Messages as Messages).setProps({
          messages: _messagesNew,
          user: this._props.user,
        });
      }


    }

    return  true;
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), this._props);
  }

  setChat(chat: Chat) {
    ChatController.getChatToken(chat.id).then(({ token }) => {
      MessageController.connect(chat.id, token);
    });
  }

  sendMessage(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.target as HTMLFormElement);

    const message = (formData.get('msg_input') as string).trim();

    if (message) {
      const escapedStr = new Option(message).innerHTML;
      MessageController.sendMessage(this._props.currentChat.id, escapedStr);
    }
  }
}

const contentWithData = withStore((state) => ({
  user: state.user,
  currentChat: state.currentChat,
  messages: state.messages
}));

export const ChatContent = contentWithData(ChatContentBase);
