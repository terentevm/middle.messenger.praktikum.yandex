import Handlebars from 'handlebars';
import { ChatAside } from './ChatAside';
import { ChatContent } from './ChatContent';
import { Component } from '../../classes';

const template = `
  <div class="chat">
    {{{ chatList }}}
    {{{ chatContent }}}
  </div>
`;

export class Chat extends Component {
  protected init() {

    this.children.chatList = new ChatAside({});
    this.children.chatContent = new ChatContent({});

  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), {});
  }
}
