import Handlebars from 'handlebars';
import { Component } from '../../classes/component/Component';
import { ComponentPropType } from '../../classes/component/types';

const template = '<div class="divider"></div>';

export class Divider extends Component<ComponentPropType> {
  constructor() {
    super( {});
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), this._props);
  }
}
