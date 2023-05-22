import { Component } from '../../../../classes';
import { ComponentPropType } from '../../../../classes/component/types';
import { MessageInfo, User } from '../../../../types';
import { Message } from './Message';

const template = `
  <content class="messanger__content">
    {{{ messagesList }}}  
  </content>
`;

interface IMessages extends ComponentPropType {
  messages: MessageInfo[];
  user: User;
}

export class Messages extends Component<IMessages> {
  constructor({ messages, user } : IMessages) {
    super({ messages, user });
  }

  protected init() {
    this.updateMessages();
  }

  protected componentDidUpdate(_oldProps?: IMessages, _newProps?:IMessages ): boolean {
    this.updateMessages();
    return true
  }

  protected render(): DocumentFragment {
    return this.renderTemplate(template, this._props);
  }

  updateMessages() {
    if (this._props.messages) {
      this.children.messagesList = [...this._props.messages].map((item: MessageInfo) => {
        return (new Message({
          message: item,
          user: this._props.user
        }));
      });
    }
  }
}
