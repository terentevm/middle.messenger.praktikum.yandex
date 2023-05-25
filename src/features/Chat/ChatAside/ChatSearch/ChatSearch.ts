import Handlebars from 'handlebars';
import { Component } from '../../../../classes';
import { BaseInput } from '../../../../components/input/BaseInput';

const template = `{{{ input }}}`;
export class ChatSearch extends Component {
  constructor() {
    super();
  }

  protected init() {
    this.children.input = new BaseInput({
      placeholder: 'Поиск',
      name: 'chalistSearch',
      id: 'chalistSearch',
      value: '',
      className: 'chatSearch',
      type: 'search'
    })
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), this._props);
  }
}
