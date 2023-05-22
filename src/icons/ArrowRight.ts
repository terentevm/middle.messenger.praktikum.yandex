import Handlebars from 'handlebars';
import { Component } from '../classes';
import{ Icon } from './types';

const template = `
  <svg width="{{width}}" height="{{height}}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008" stroke="{{color}}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

export class ArrowRight extends Component<Icon> {
  constructor({width='24', height='24', color='#292D32'}: Icon) {
    super({width, height, color});
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), this._props);
  }
}
