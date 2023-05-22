import { Component } from '../../../../classes';
import { Tooltip } from '../../../../components/tooltip';
import { PlusRounded, CloseRounded } from '../../../../icons';
import { TooltipAction } from '../../../../components/TooltipAction/TooltipAction';
import { EventType } from '../../../../classes/component/types';
import { Modal } from '../../../../components/modal/Modal';
import { UserForm } from '../UserForm';
import ChatController from '../../../../controllers/ChatController';
import { withStore } from '../../../../classes/Store';
const template = `
<div class="messanger__header">
  <div>
  
  </div> 
  
  {{{ Tooltip }}}
  {{{ ModalAddUser }}}  
</div>
`;

export class HeaderBase extends Component<any> {
  constructor(props: any) {
    super(props);
  }

  protected init() {
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
    this.children.ModalAddUser = new Modal({ visible: false, content: userFromAdd });
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
    });

    return [action1, action2];
  }

  actionAddUserOnClick(e: Event) {
    e?.stopPropagation();
    this.closeTooltip();

    this.changeModalVisibility(this.children.ModalAddUser as Modal, true);

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
}

const contentWithData = withStore((state) => ({
  user: state.user,
  currentChat: state.currentChat,
}));

export const Header = contentWithData(HeaderBase);
