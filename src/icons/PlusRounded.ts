import{ Icon } from './types';
import { Component } from '../classes';

const template = `
<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="11" cy="11" r="10.25" stroke="{{color}}" stroke-width="1.5"/>
  <line x1="10.9999" y1="5.5" x2="10.9999" y2="16.5" stroke="{{color}}" stroke-width="1.5"/>
  <line x1="5.49988" y1="11" x2="16.4999" y2="11" stroke="{{color}}" stroke-width="1.5"/>
</svg>
`;

export class PlusRounded extends Component<Icon> {
  constructor({width='24', height='24', color='#3369F3'}: Icon) {
    super({width, height, color});
  }

  protected render(): DocumentFragment {
    return this.renderTemplate(template, this._props);
  }
}
