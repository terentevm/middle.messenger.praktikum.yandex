import { Component } from '../../../../classes';
import { Tooltip } from '../../../../components/tooltip';
import { PlusRounded, CloseRounded } from '../../../../icons';
import { TooltipAction } from '../../../../components/TooltipAction/TooltipAction';
import { EventType } from '../../../../classes/component/types';
import { Modal } from '../../../../components/modal/Modal';
import { UserForm } from '../UserForm';
import ChatController from '../../../../controllers/ChatController';
import { withStore } from '../../../../classes/Store';
import { store } from '../../../../classes/Store';
import { Divider } from '../../../../components/divider';
import { removeFromArray } from '../../../../utils/arrays';
import { Avatar } from '../../../../components/avatar';
import { StoreEvents } from '../../../../classes/Store/Store';
import { getFullFileUrl } from '../../../../utils/common';

const template = `
<div class="messanger__header">
  {{#if currentChat}}
  <div class="messanger__avatar">
    {{{ Avatar }}}
  </div> 
  
  {{{ Tooltip }}}
  {{{ ModalAddUser }}}
  {{{ ModalRemoveUser }}} 
  {{/if}}
</div>
`;

export class HeaderBase extends Component<any> {
  constructor(props: any) {
    super(props);
  }

  protected init() {

    this.children.Avatar = new Avatar({
      src: getFullFileUrl(this._props.currentChat?.avatar),
      id: 'chat_avatar_header',
      events: {
        change: this.chatAvatarOnChange.bind(this)
      } as EventType
    });

    this.children.Tooltip = new Tooltip({
      visible: false,
      content: this.getTooltipActions(),
    });

    const userFromAdd = new UserForm({
      title: 'Добавить пользователя',
      events: {
        submit: this.addUserToChatOnSubmit.bind(this),
      } as EventType
    });

    const userFormRemove = new UserForm({
      title: 'Удалить пользователя',
      events: {
        submit: this.removeUserFromChat.bind(this),
      } as EventType
    });

    this.children.ModalAddUser = new Modal({
      visible: false,
      content: userFromAdd,
      onClose: () => {
        this.changeModalVisibility(this.children.ModalAddUser as Modal, false);
      }
    });

    this.children.ModalRemoveUser = new Modal({
      visible: false,
      content: userFormRemove,
      onClose: () => {
        this.changeModalVisibility(this.children.ModalRemoveUser as Modal, false);
      }
    });

    store.on(StoreEvents.Updated, () => {
      const state = store.getState();

      if (state.currentChat) {
        (this.children.Avatar as Avatar).setProps({
          src: getFullFileUrl(state.currentChat.avatar)
        })
      }
    })
  }

  protected render(): DocumentFragment {
    return this.renderTemplate(template, this._props);
  }

  getTooltipActions() {
    const action1 = new TooltipAction({
      icon: new PlusRounded({}),
      text: 'Добавить пользователя',
      events: {
        click: this.actionAddUserOnClick.bind(this),
      } as EventType
    });

    const action2 = new TooltipAction({
      icon: new CloseRounded({}),
      text: 'Удалить пользователя',
      events: {
        click: this.actionRemoveUserOnClick.bind(this),
      } as EventType
    });

    const divider = new Divider();

    const action3 = new TooltipAction({
      icon: new CloseRounded({ color: 'red'}),
      text: 'Удалить чат',
      events: {
        click: this.removeChat.bind(this),
      } as EventType
    });

    return [action1, action2, divider, action3];
  }

  actionAddUserOnClick(e: Event) {
    e?.stopPropagation();
    this.closeTooltip();

    this.changeModalVisibility(this.children.ModalAddUser as Modal, true);

  }

  actionRemoveUserOnClick(e: Event) {
    e?.stopPropagation();
    this.closeTooltip();

    this.changeModalVisibility(this.children.ModalRemoveUser as Modal, true);

  }

  closeTooltip() {
    (this.children.Tooltip as Tooltip).setProps({visible: false});
  }

  changeModalVisibility(modal: Component, visible: boolean) {
    (modal as Modal).setProps({
      visible: visible
    })
  }

  addUserToChatOnSubmit(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.target as HTMLFormElement);

    ChatController.searchUsers(formData.get('login') as string).then((res: any) => {
      if (Array.isArray(res) && res.length === 0) {
        alert(`Пользователь ${formData.get('login')} не найден`);
        return;
      }

      const userId = res[0].id;

      ChatController.addUserToChat(this._props.currentChat?.id, userId).then(() => {
        this.changeModalVisibility(this.children.ModalAddUser as Modal, false);
      });

    }).catch(err => {
      console.error(err);
      alert('Не удалось добавить пользователя');
    })
  }

  removeUserFromChat(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.target as HTMLFormElement);

    ChatController.searchUsers(formData.get('login') as string).then((res: any) => {
      if (Array.isArray(res) && res.length === 0) {
        alert(`Пользователь ${formData.get('login')} не найден`);
        return;
      }

      const userId = res[0].id;

      ChatController.removeUsersFromChat(this._props.currentChat?.id, userId).then(() => {
        this.changeModalVisibility(this.children.ModalRemoveUser as Modal, false);
      });

    }).catch(err => {
      console.error(err);
      alert('Не удалось удалить пользователя');
    })
  }

  removeChat() {
    if (!this._props.currentChat) {
      alert('Не выбран текущий чат');
    }
    if (!window.confirm('Подтвердите удаление чата')) {
      return;
    }

    ChatController.delete(this._props.currentChat.id).then(() => {
      const currentState = store.getState();
      const newChatList = removeFromArray(currentState.chatList, this._props.currentChat.id)
      store.updateState({
        ...currentState,
        currentChat: null,
        chatList: newChatList,
      });

    }).catch((err: Error) => {
      console.error(err);
      alert('Не удалось удалить чат');
    })
  }

  chatAvatarOnChange(e: Event) {
    e.stopPropagation();
    console.log('chatAvatarOnChange');
    const files = (e.target as HTMLInputElement).files || [];

    console.log(files)
    if (files.length > 0) {
      const formData = new FormData();
      formData.append('avatar', files[0]);
      formData.append('chatId', this._props.currentChat?.id);

      ChatController.updateChatAvatar(formData).then(res => {
        (this.children.Avatar as Avatar).setProps({
          src: getFullFileUrl(res.avatar)
        })
      }).catch(err => {
        console.error(err);
        alert('Не удалось обновить аватар');
      })
    }
  }

}

const contentWithData = withStore((state) => ({
  user: state.user,
  currentChat: state.currentChat,
  chatList: state.chatList,
}));

export const Header = contentWithData(HeaderBase);
