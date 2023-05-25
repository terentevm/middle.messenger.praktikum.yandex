import Handlebars from 'handlebars';
import { Component } from '../../../../classes';
import { Chat } from '../../../../types';
import { Avatar } from '../../../../components/avatar';
import { ComponentPropType } from '../../../../classes/component/types';
import { getFullFileUrl } from '../../../../utils/common';

const template = `
  <li class="{{ className }}">
    <div class="chatElement__avatar">
      {{{ avatar }}}
    </div>
    <div class="chatElement__center">
        <p class="chatElement__title">{{ title }}</p>
        {{#if last_message}}
          <p class="chatElement__message">{{ lastMessage }}</p>
        {{else}}
          <p class="chatElement__message">Нет сообщений</p>
        {{/if}}
    </div>
    <div class="chatElement__right">
        
    </div>
  
  </li>
`;

export interface IChatElementProps extends ComponentPropType, Chat {
  isActive: boolean
}
export class ChatElement extends Component<IChatElementProps> {

  constructor(props: IChatElementProps) {
    super(props);
  }

  protected init() {

    this.children.avatar = new Avatar({
      src: getFullFileUrl(this._props.avatar),
      id: `avatar_chat_${this._props.id}`
    });

    this.setProps({
      className: this._props.isActive ? 'chatElement chatElement__active' : 'chatElement'
    });

  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), {
      ...this._props,
      className: this._props.className,
      lastMessage: this.lastMessagePresentation(this._props.last_message?.content)
    });
  }

  lastMessagePresentation(lastMessage: string | undefined) {
    if (!lastMessage) {
      return "";
    }

    return lastMessage.length > 20 ? `${lastMessage.slice(0, 20)}...` : lastMessage;
  }
}
