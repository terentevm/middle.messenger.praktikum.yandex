import Handlebars from 'handlebars';
import { BackAside } from '../BackAside';
import { ContainerWithBackPanelType } from './types';
import { Component } from '../../classes/component/Component';

const template = `
  <div class="containerProfile">
    {{{ backAside }}}
    {{{ childrenComponent }}}
  </div>
`;

export class ContainerWithBackPanel extends Component<ContainerWithBackPanelType> {
  constructor(props: ContainerWithBackPanelType) {
    super(props);
  }

  protected init() {
    this.children.backAside = new BackAside({});
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), this._props);
  }
}
