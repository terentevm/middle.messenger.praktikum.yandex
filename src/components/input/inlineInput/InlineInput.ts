import Handlebars from 'handlebars';
import { InputProps } from '../types.js';

const template = `
  <div class="inputInline">
    <label
      
      {{#if id}}
        for="{{id}}"
      {{/if}}
      class="inputInline__label">{{ label }}</label>
    <input
      {{#if id}}
        id="{{id}}"
      {{/if}}
      {{#if type}}
        type="{{type}}"
      {{/if}}
      {{#if placeholder}}
        placeholder={{placeholder}}
      {{/if}}
      {{#if value}}
        value={{ value }}
      {{/if}}
      {{#if name}}
        name={{ name }}
      {{/if}}
      class="inputInline__input"
      {{#if disabled}}
        disabled
      {{/if}}
    >
  </div>
`;

export const InlineInput = (props: InputProps) => {
  const render = Handlebars.compile(template);
  return render(props);
}
