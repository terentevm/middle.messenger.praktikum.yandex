import Handlebars from 'handlebars';
import ArrowLeft from '../../icons/ArrowLeft.svg';
import { Badge } from '../../components/badge';
import { Component } from '../../classes/component/Component';
import { ComponentPropType } from '../../classes/component/types';

const template = `
  <section class="backAside">
    {{{ badge }}}
  </section>
`;

class BackAside extends Component<ComponentPropType> {
  constructor() {
    super('section', {});
  }

  protected init() {
    this.children.badge = new Badge({ type: 'primary', size: 'medium', content: ArrowLeft });
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), this._props);
  }
}

export { BackAside };
