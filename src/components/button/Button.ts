import Handlebars from 'handlebars';
import { ButtonProps } from './types';
import { Component } from '../../classes/component/Component';

export const template = `
  <button
    type="{{type}}"
    class="{{className}}"
  >{{title}}
  </button>
`;

export class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super('button', props);
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), this._props);
  }
}

export class PrimaryButton extends Button {
  constructor({
    title, type = 'button', className = '', events,
  }: ButtonProps) {
    super({
      title, className: `btn btn_primary ${className}`, type, events,
    });
  }
}

export class LinkButton extends Button {
  constructor({
    title, type = 'button', className = '', events,
  }: ButtonProps) {
    super({
      title, className: `btn btn_link ${className}`, type, events,
    });
  }
}
