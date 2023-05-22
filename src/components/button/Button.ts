import Handlebars from 'handlebars';
import { ButtonProps, LinkProps } from './types';
import { Component } from '../../classes/component/Component';

export const template = `
  <button
    type="{{type}}"
    class="{{className}}"
  >
  {{#if title}}
    {{title}}
  {{/if}}
  {{#if icon}}
    {{{ icon }}}
  {{/if}}
  </button>
`;

export const templateLink = `
  <span class="link__wrapper">
    <a
      class="{{className}}"
      href="{{to}}"
    >{{title}}
    </a>
    {{#if icon}}
      {{{ icon }}}
    {{/if}}
  </span>
`;

export const templateIcon = `
  <button
    type="{{type}}"
    class="{{className}}"
  >{{{ icon }}}
  </button>
`;
export class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);

  }

  protected init() {
    console.log('btn init')
    let className = this._props.className;

    if (this._props.fullWidth) {
      this._props.className = className + 'btn_fw'
    }
  }

  protected render(): DocumentFragment {
    console.log(this._props.fullWidth)
    console.log(this._props.className);
    return this.compile(Handlebars.compile(template), this._props);
  }
}

export class PrimaryButton extends Button {
  constructor({
    title, type = 'button', className = '', events, fullWidth, icon
  }: ButtonProps) {
    super({
      title, className: `btn btn_primary ${className}`, type, events, fullWidth, icon
    });
  }
}

export class IconButton extends Button {
  constructor({
    title, type = 'button', className = 'btn_icon', icon, events,
  }: ButtonProps) {
    super({
      title, className, type, icon, events,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(templateIcon), this._props);
  }
}

export class LinkButton extends Component<LinkProps> {
  constructor({
    title,
    to='',
    className = '',
    events,
    type='link',
    icon
  }: LinkProps) {
    super({
      title, to, className: `btn btn__link ${className}`, events, type, icon
    });
  }

  protected render(): DocumentFragment {

    const tmpl = this._props.type === 'link' ? templateLink : template;
    return this.compile(Handlebars.compile(tmpl), this._props);
  }
}
