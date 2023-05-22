import Handlebars from 'handlebars';
import ArrowLeft from '../../icons/ArrowLeft.svg';
import { Badge } from '../../components/badge';
import { Component } from '../../classes/component/Component';
import { ComponentPropType, EventType } from '../../classes/component/types';
import { withRouter } from '../../classes';

const template = `
  <section class="backAside">
    {{{ badge }}}
  </section>
`;

class BackAsideBase extends Component<ComponentPropType> {
  constructor(props: any) {
    super(props);
  }

  protected init() {
    this.children.badge = new Badge({
      type: 'primary',
      size: 'medium',
      content: ArrowLeft,
      events: {
        click: this.backOnClick.bind(this)
      } as EventType
    });
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), this._props);
  }

  backOnClick() {
    this.router?.back();
  }
}

export const  BackAside = withRouter(BackAsideBase);
