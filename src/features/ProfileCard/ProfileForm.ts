import Handlebars from 'handlebars';
import { ProfileData } from './PorfileData';
import { LinkButton, PrimaryButton } from '../../components/button/Button';
import { Divider } from '../../components/divider';
import { Header } from './Header';
import { Component } from '../../classes/component/Component';
import { EventType } from '../../classes/component/types';
import { UserController } from '../../controllers/UserController';
import { User } from '../../types';
import { withStore } from '../../classes/Store';
import { withRouter } from '../../classes';
import { Routes } from '../../config';

const template = `
  <div class="pofileForm">
    {{{ ProfileHeader }}}
    <form class="pofileForm__form">
      {{{ ProfileData }}}
      {{#if readOnly }}
        <section class="pofileForm__actions">
      
        {{{ ButtonLinkEditData }}}
    
        {{{ Divider1 }}}
    
        {{{ ButtonLinkChangePass }}}
    
        {{{ Divider2 }}}
    
        {{{ ButtonLinkChangeLogOut }}}
    
        </section>
      {{ else }}
        <section class="pofileForm__save">
    
          {{{ ButtonSave}}}
          {{{ Divider3 }}}
          {{{ ButtonCancel }}}
        </section>
      {{/if}}
    </form>
  </div>
`;

class ProfileFormBase extends Component {
  constructor(props: any) {
    super(props);
  }

  protected init() {
    if (!this._props.events) {
      this._props.events = {} as EventType;
    }
    this._props.events.submit= this.saveBtnOnClick;

    const { user } = this._props;
    this.children.Divider1 = new Divider();
    this.children.Divider2 = new Divider();
    this.children.Divider3 = new Divider();
    this.children.ProfileHeader = new Header({
      withName: true,
    });
    this.children.ProfileData = new ProfileData({
      data: user,
      mode: 'read',
    });

    this.children.ButtonLinkEditData = new LinkButton({
      title: 'Изменить данные',
      type: 'button',
      className: 'btn_link_medium',
      events: {
        click: this.editBtnOnClick.bind(this),
      } as EventType,
    });
    this.children.ButtonLinkChangePass = new LinkButton({
      title: 'Изменить пароль',
      type: 'link',
      to: Routes.pofileChangePassword.url,
      className: 'btn_link_medium',
    });
    this.children.ButtonLinkChangeLogOut = new LinkButton({
      title: 'Выйти',
      type: 'button',
      className: 'btn_link_danger btn_link_medium',
      events: {
        click: this.logoutOnClick.bind(this)
      } as EventType
    });
    this.children.ButtonSave = new PrimaryButton({
      title: 'Сохранить',
      type: 'submit',
      className: 'btn_large',
    });
    this.children.ButtonCancel = new LinkButton({
      title: 'Отменить изменения',
      type: 'button',
      className: 'btn_link_danger btn_link_medium',
      events: {
        click: function () {
          this.setProps({
            mode: 'read',
          });
          (this.children.ProfileData as ProfileData).setProps({
            mode: 'read',
          });
        }.bind(this)
      } as EventType
    });
  }

  protected render(): DocumentFragment {
    console.log('profile rerender')
    return this.compile(Handlebars.compile(template), {
      ...this._props,
      readOnly: this._props.mode === 'read',
    });
  }

  public editBtnOnClick (e: Event) {
    e.stopPropagation();
    this.setProps({
      mode: 'edit',
    });
    (this.children.ProfileData as ProfileData).setProps({
      mode: 'edit',
    });
  };

  saveBtnOnClick(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.target as HTMLFormElement);

    // @ts-ignore
    const newUserData = Object.fromEntries(formData) as User;

    (new UserController()).updateProfile(newUserData).then(() => {
      this.setProps({
        mode: 'read',
      });
      (this.children.ProfileData as ProfileData).setProps({
        data: newUserData,
        mode: 'read',
      });
    })
  };

  logoutOnClick() {
    (new UserController()).logout().then(()=>this.router?.go(Routes.login.url)).catch(()=>alert('Произошла ошибка'));
  }
}
const profileWithProps = withStore((state) => ({ user: state.user }))
export const ProfileForm = profileWithProps(withRouter(ProfileFormBase));
