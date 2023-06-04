import Handlebars from 'handlebars';
import { ProfileDataProps } from './types';
import { InputGroup, ProfileInput } from '../../components/input';
import { Divider } from '../../components/divider';
import { Component } from '../../classes/component/Component';
import { rules } from '../../utils/validationRules';
import { User } from '../../types';

const template = `
  <section class="pofileForm__data">
    {{{ emailInput }}}
    {{{ Divider }}}
    {{{ loginInput }}}
    {{{ Divider2 }}}
    {{{ firstNameInput }}}
    {{{ Divider3 }}}
    {{{ secondNameInput }}}
    {{{ Divider4 }}}
    {{{ displayNameInput }}}
    {{{ Divider5 }}}
    {{{ phoneInput }}}

  </section>
`;

export class ProfileData extends Component<ProfileDataProps> {
  constructor(props: ProfileDataProps) {
    super(props);
  }

  protected init() {

    const {
      email, login, first_name, second_name, display_name, phone,
    } = this._props.data;

    this.children.emailInput = ProfileInput({
      id: 'profile_input_mail',
      type: 'email',
      name: 'email',
      label: 'Почта',
      placeholder: 'Почта',
      error: '',
      value: email,
      validate: true,
      required: true,
      pattern: rules.email,
      onErrorMsg: 'Неверная почта',
      disabled: this._props.mode === 'read',
    });

    this.children.loginInput = ProfileInput({
      id: 'profile_input_login',
      type: 'text',
      name: 'login',
      label: 'Логин',
      placeholder: 'Логин',
      error: '',
      value: login,
      validate: true,
      required: true,
      pattern: rules.login,
      onErrorMsg: 'Неверный логин',
      disabled: this._props.mode === 'read',
    });

    this.children.firstNameInput = ProfileInput({
      id: 'profile_input_first_name',
      type: 'text',
      name: 'first_name',
      label: 'Имя',
      placeholder: 'Имя',
      error: '',
      value: first_name,
      validate: true,
      required: true,
      pattern: rules.firstName,
      onErrorMsg: 'Имя указано не верно',
      disabled: this._props.mode === 'read',
    });

    this.children.secondNameInput = ProfileInput({
      id: 'profile_input_second_name',
      type: 'text',
      name: 'second_name',
      label: 'Фамилия',
      placeholder: 'Фамилия',
      error: '',
      value: second_name,
      validate: true,
      required: true,
      pattern: rules.secondName,
      onErrorMsg: 'Фамилия указана не верно',
      disabled: this._props.mode === 'read',
    });
    this.children.displayNameInput = ProfileInput({
      id: 'profile_input_chatname',
      type: 'text',
      name: 'display_name',
      label: 'Имя в чате',
      placeholder: 'Имя в чате',
      error: '',
      value: display_name,
      validate: true,
      required: true,
      pattern: rules.secondName,
      onErrorMsg: 'Имя в чате указано не верно',
      disabled: this._props.mode === 'read',
    });
    this.children.phoneInput = ProfileInput({
      id: 'signup_phone_input',
      type: 'tel',
      name: 'phone',
      label: 'Телефон',
      placeholder: 'Телефон',
      error: '',
      value: phone,
      validate: true,
      required: true,
      pattern: rules.phone,
      onErrorMsg: 'Телефон указан не верно',
      disabled: this._props.mode === 'read',
    });

    this.children.Divider = new Divider();
    this.children.Divider2 = new Divider();
    this.children.Divider3 = new Divider();
    this.children.Divider4 = new Divider();
    this.children.Divider5 = new Divider();
  }

  protected componentDidUpdate(_oldProps?: ProfileDataProps, newProps?: ProfileDataProps): boolean {

    if (newProps) {
      const inputs = Object.values(this.children).filter((value: Component) => value instanceof InputGroup);

      inputs.forEach((input: Component) => {
        const inputName = input._props.name as keyof User;

        input.setProps({
          disabled: newProps?.mode === 'read',
          value: newProps.data [inputName]
        });
      })
    }

    return false;
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), this._props);
  }
}
