import { Component } from '../../../../classes';
import { LoginInput } from '../../../../components/input';
import { PrimaryButton } from '../../../../components/button/Button';
import { IUserFormProps } from './types';

const template = `
  <form class="userForm">
    <h3 class="userForm__title">{{ title }}</h3>
    <div class="userForm__content">
    {{{ input }}}
    </div>
    {{{ buttonSubmit }}}
  </form>
`;

export class UserForm extends Component<IUserFormProps> {
  constructor(props: IUserFormProps ) {
    super(props);
  }

  protected init() {
    this.children.input = LoginInput({
      id: 'login',
      name: 'login',
      placeholder: 'Логин',
      label: 'Логин',
      value: '',
      required: true,
      onErrorMsg: 'Впишите Логин',
    });

    this.children.buttonSubmit = new PrimaryButton( {
      title: this._props.title,
      type: 'submit',
      fullWidth: true,
    });
  }

  protected render(): DocumentFragment {
    return this.renderTemplate(template, this._props);
  }
}
