import Handlebars from 'handlebars';
import { Component } from '../../classes/component/Component';
import { HeaderProps } from './types';

const template = `
  <section class="pofileForm__header">
    {{{ Avatar }}}
    {{#if withName}}
      <h4 class="pofileForm__name">{{ name }}</h4>
    {{/if}}
    
  </section>
`;

export class Header extends Component<HeaderProps> {
  constructor(props: HeaderProps) {
    super('section', props);
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), this._props);
  }
}
