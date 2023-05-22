import Handlebars from 'handlebars';
import { Avatar } from '../../components/avatar';
import { PrimaryButton } from '../../components/button/Button';
import { Divider } from '../../components/divider';
import { ProfileInput } from '../../components/input';
import { Component } from '../../classes/component/Component';
import { Header } from './Header';
import { withStore } from '../../classes/Store';
import { UserController } from '../../controllers/UserController';
import { withRouter } from '../../classes';

const template = `
  <div class="pofileForm">
    {{{ ProfileHeader }}}
    <form class="pofileForm__form">
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
    </form>
  </div>
`;

class ChangePasswordFormBase extends Component {
  constructor(props: any) {
    super(props);

    if ( !this._props.events) {
      this._props.events = {};
    }

    this._props.events.submit = this.onSubmit.bind(this);
  }

  protected init() {
    const { user } = this._props;
    this.children.ProfileHeader = new Header({
      withName: false,
      Avatar: new Avatar({ src: user.avatar }),
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
      type: 'submit',
      className: 'btn_large',
    });
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), this._props);
  }

  onSubmit(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.target as HTMLFormElement);
    const msg: { oldPassword: string, newPassword: string} = {
      oldPassword: formData.get('oldPassword') as string || '',
      newPassword: formData.get('newPassword') as string || '',
    };

    (new UserController()).changePassword(msg).then(() => {
      this.router?.back();
    }).catch(()=>alert('Не удалось изменить пароль'));
  }
}

const profileWithProps = withStore((state) => ({ user: state.user }));
export const ChangePasswordForm = profileWithProps(withRouter(ChangePasswordFormBase));
