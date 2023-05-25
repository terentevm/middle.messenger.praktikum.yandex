import Handlebars from 'handlebars';
import { Component } from '../classes';
import{ Icon } from './types';

const template = `
  <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12.5" cy="13" r="12.5" fill="#F5F5F5"/>
    <circle cx="12.5" cy="7" r="1.5" fill="#3369F3"/>
    <circle cx="12.5" cy="13" r="1.5" fill="#3369F3"/>
    <circle cx="12.5" cy="19" r="1.5" fill="#3369F3"/>
  </svg>

`;

export class TooltipMenu extends Component<Icon> {
  constructor({width='24', height='24', color='#292D32'}: Icon) {
    super({width, height, color});
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), this._props);
  }
}
