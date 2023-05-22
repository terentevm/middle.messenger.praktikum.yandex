import Handlebars from 'handlebars';
import { Component } from '../classes';
import{ Icon } from './types';

const template = `
  <svg width="{{width}}" height="{{height}}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2H8C4 2 2 4 2 8V21C2 21.55 2.45 22 3 22H16C20 22 22 20 22 16V8C22 4 20 2 16 2Z" stroke="{{color}}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8.5 12H15.5" stroke="{{color}}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 15.5V8.5" stroke="{{color}}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

export class AddNew extends Component<Icon> {
  constructor({width='24', height='24', color='#292D32'}: Icon) {
    super({width, height, color});
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), this._props);
  }
}
