import Handlebars from 'handlebars';
import { Component } from '../../../../classes';
import { INewChatForm } from './types';
import { LoginInput } from '../../../../components/input';
import { PrimaryButton } from '../../../../components/button/Button';

const template = `
  <form class="newChatForm">
    <h3 class="newChatForm__title">Новый чат</h3>
    <div class="newChatForm__content">
    {{{ input }}}
    </div>
    {{{ buttonSubmit }}}
  </form>
`;

export class NewChatForm extends Component<INewChatForm> {
  constructor(props: INewChatForm ) {
    super(props);
  }

  protected init() {
    this.children.input = LoginInput({
      id: 'title',
      name: 'title',
      placeholder: 'Название чата',
      label: 'Название чата',
      value: '',
      required: true,
      onErrorMsg: 'Впишите название чата',
    });

    this.children.buttonSubmit = new PrimaryButton( {
      title: 'Создать чат',
      type: 'submit',
      fullWidth: true,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), this._props);
  }
}
