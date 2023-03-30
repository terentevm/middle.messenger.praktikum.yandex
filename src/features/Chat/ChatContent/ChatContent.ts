import Handlebars from 'handlebars';
import { Component } from '../../../classes';

const template = `
  <main></main>
`;

export class ChatContent extends Component {
  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), {});
  }
}
