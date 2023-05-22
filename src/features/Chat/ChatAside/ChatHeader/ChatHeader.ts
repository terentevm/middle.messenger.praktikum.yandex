import Handlebars from 'handlebars';
import { Component } from '../../../../classes';
import { IconButton } from '../../../../components/button';
import { LinkButton } from '../../../../components/button/Button';
import { Routes } from '../../../../config';
import { AddNew, ArrowRight } from '../../../../icons';
import { IChatHeader } from './types';
import { EventType } from '../../../../classes/component/types';

const template = `
  <section class="chatHeader">
    {{{ buttonNewChat }}}
    {{{ linkProfile }}}
  </section>
`;

class ChatHeader extends Component<IChatHeader> {
  constructor({ onAddNew } : IChatHeader) {
    super({ onAddNew });
  }

  protected init() {

    const iconBtn = new AddNew({ color: '#3369F3'});
    const arrowRight = new ArrowRight({ width: '16', height: '16', color: '#999999'});

    this.children.buttonNewChat = new IconButton({
      type: 'button',
      title: 'Новый чат',
      icon: iconBtn,
      events: {
        click: (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          this._props.onAddNew();
        }
      } as EventType
    });

    this.children.linkProfile = new LinkButton({
      type: 'link',
      title: 'Профиль',
      to: Routes.profile.url,
      className: 'btn__link_secondary',
      icon: arrowRight
    });
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), this._props);
  }
}

export { ChatHeader };
