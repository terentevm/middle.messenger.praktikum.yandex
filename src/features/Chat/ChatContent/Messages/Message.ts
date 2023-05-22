import { Component } from '../../../../classes';
import { ComponentPropType } from '../../../../classes/component/types';
import { MessageInfo, User } from '../../../../types';

const template = `
  <div class="{{ className }}">
    <div class="{{ classNameContent }}">
      {{ message.content }}
    </div>
    
  </div>
`;

interface IMessageProps extends ComponentPropType {
  message: MessageInfo;
  user: User
}

export class Message extends Component<IMessageProps> {
  constructor({ message, user }: IMessageProps) {
    super({ message, user });
  }

  protected init() {

    const classList = ['message'];

    const isOutMessage = this._props.message.user_id === this._props.user.id;

    isOutMessage
      ? classList.push('message_out')
      : classList.push('message_in');

    this._props['className'] = classList.join(' ');

    this._props['classNameContent'] = isOutMessage ? ' messageContent messageContent_out' : 'messageContent messageContent_in';

  }

  protected render(): DocumentFragment {
    return this.renderTemplate(template, this._props)
  }
}
