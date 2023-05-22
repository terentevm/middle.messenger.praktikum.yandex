import{ Icon } from './types';
import { Component } from '../classes';

const template = `
<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="11" cy="11" r="10.25" stroke="{{color}}"stroke-width="1.5"/>
  <line x1="7.11077" y1="7.11103" x2="14.8889" y2="14.8892" stroke="{{color}}" stroke-width="1.5"/>
  <line x1="7.11078" y1="14.8891" x2="14.889" y2="7.11093" stroke="{{color}}" stroke-width="1.5"/>
</svg>

`;

export class CloseRounded extends Component<Icon> {
  constructor({width='24', height='24', color='#3369F3'}: Icon) {
    super({width, height, color});
  }

  protected render(): DocumentFragment {
    return this.renderTemplate(template, this._props);
  }
}
