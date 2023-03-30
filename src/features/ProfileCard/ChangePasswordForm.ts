import Handlebars from 'handlebars';
import { Avatar } from '../../components/avatar';
import { ProfileFormProps } from './types';
import { PrimaryButton } from '../../components/button/Button';
import { Divider } from '../../components/divider';
import { ProfileInput } from '../../components/input';
import { Component } from '../../classes/component/Component';
import { Header } from './Header';

const template = `
  <div class="pofileForm">
    {{{ ProfileHeader }}}
     <section class="pofileForm__data">
      {{{ OldPasswordInput }}}
      {{{ Divider1 }}}
      {{{ NewPasswordInput }}}
      {{{ Divider2 }}}
      {{{ NewPasswordRepeatInput }}}
    </section>
      <section class="pofileForm__save">
  
      {{{ ButtonSave}}}
  
    </section>
  </div>
`;

export class ChangePasswordForm extends Component<ProfileFormProps> {
  constructor(props: ProfileFormProps) {
    super('div', props);
  }

  protected init() {
    this.children.ProfileHeader = new Header({
      withName: false,
      Avatar: new Avatar({ src: this._props.avatar }),
    });
    this.children.Divider1 = new Divider();
    this.children.Divider2 = new Divider();
    this.children.OldPasswordInput = ProfileInput({
      id: 'old_password',
      name: 'oldPassword',
      value: '',
      label: 'Старый пароль',
      type: 'password',
    });
    this.children.NewPasswordInput = ProfileInput({
      id: 'new_password',
      name: 'newPassword',
      value: '',
      label: 'Новый пароль',
      type: 'password',
    });
    this.children.NewPasswordRepeatInput = ProfileInput({
      id: 'new_password_repeat',
      name: 'newPasswordRepeat',
      value: '',
      label: 'Повторите новый пароль',
      type: 'password',
    });
    this.children.ButtonSave = new PrimaryButton({
      title: 'Сохранить',
      type: 'button',
      className: 'btn_large',
    });
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), this._props);
  }
}
