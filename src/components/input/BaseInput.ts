import Handlebars from 'handlebars';
import { InputProps } from './types';
import { Component } from '../../classes/component/Component';

const template = `
  <input
    {{#if type}}
      type="{{type}}"
    {{/if}}
    {{#if className}}
      class="{{className}}"
    {{/if}}
    {{#if placeholder}}
      placeholder="{{placeholder}}"
    {{/if}}
    {{#if value}}
      value={{ value }}
    {{/if}}
    {{#if name}}
      name={{ name }}
    {{/if}}
    {{#if required}}
      required
    {{/if}}
    {{#if disabled}}
      disabled
    {{/if}}
    {{#if pattern}}
      pattern = "{{pattern}}"
    {{/if}}
  />
`;

export class BaseInput extends Component<InputProps> {
  constructor(props: InputProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), this._props);
  }

  get value() {
    return (this.element as HTMLInputElement).value!;
  }

  checkValidity() {
   return (this.element as HTMLInputElement).checkValidity();
  }
}
