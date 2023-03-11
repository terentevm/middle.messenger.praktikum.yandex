import Handlebars from 'handlebars';
import { InputProps } from './types.js';

const template = `
  <label for="{{name}}" class="input__label">
    {{#if value}}
      {{label}}
    {{/if}}
    <input
        {{#if type}}
        type="{{type}}"
        {{/if}}
        class="input"
        placeholder={{placeholder}}
        {{#if value}}
          value={{ value }}
        {{/if}}
        name={{ name }}
    >
    {{#if error}}
      <p class="input__error">{{error}}</p>
    {{/if}}
  </label>
`;

const Input = (props: InputProps) => {

  const render = Handlebars.compile(template);
  return render(props);
}

export { Input };
