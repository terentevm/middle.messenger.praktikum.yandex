import Handlebars from 'handlebars';
import { Component } from '../../../classes';

const template = `
  <aside class="chatList">
  
  </aside >
`;

export class ChatList extends Component {
  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), {})
  }
};
