import Handlebars from 'handlebars';
import { LabelPropType } from './types';
import { Component } from '../../classes/component/Component';

const template = `
  
  <label
    for="{{ labelFor }}"
    {{#if className}}
      class="{{className}}"
    {{/if}}
    >
      {{ title }}
    </label>
`;

export class Label extends Component<LabelPropType> {
  constructor(props: LabelPropType) {
    super('label', props);
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), this._props);
  }
}
