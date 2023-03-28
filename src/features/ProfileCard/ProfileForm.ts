import Handlebars from 'handlebars';
import { Avatar } from '../../components/avatar';
import { ProfileFormProps } from './types';
import { ProfileData } from './PorfileData';
import { LinkButton, PrimaryButton } from '../../components/button/Button';
import { Divider } from '../../components/divider';
import { Header } from './Header';
import { Component } from '../../classes/component/Component';
import { EventType } from '../../classes/component/types';

const template = `
  <div class="pofileForm">
    {{{ ProfileHeader }}}
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
  
      </section>
    {{/if}}
  </div>
`;

export class ProfileForm extends Component<ProfileFormProps> {
  constructor(props: ProfileFormProps) {
    super('div', props);
  }

  protected init() {
    this.children.Divider1 = new Divider();
    this.children.Divider2 = new Divider();
    this.children.ProfileHeader = new Header({
      withName: true,
      name: this._props.data.firstName,
      Avatar: new Avatar({ src: this._props.avatar }),
    });
    this.children.ProfileData = new ProfileData({
      data: this._props.data,
      mode: this._props.mode,
    });

    this.children.ButtonLinkEditData = new LinkButton({
      title: 'Изменить данные',
      type: 'button',
      className: 'btn_link_medium',
      events: {
        click: this.editBtnOnClick,
      } as EventType,
    });
    this.children.ButtonLinkChangePass = new LinkButton({
      title: 'Изменить пароль',
      type: 'button',
      className: 'btn_link_medium',
    });
    this.children.ButtonLinkChangeLogOut = new LinkButton({
      title: 'Выйти',
      type: 'button',
      className: 'btn_link_danger btn_link_medium',
    });
    this.children.ButtonSave = new PrimaryButton({
      title: 'Сохранить',
      type: 'button',
      className: 'btn_large',
      events: {
        click: this.saveBtnOnClick,
      } as EventType,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), {
      ...this._props,
      readOnly: this._props.mode === 'read',
    });
  }

  editBtnOnClick = (e: Event) => {
    e.stopPropagation();
    this.setProps({
      mode: 'edit',
    });
  };

  saveBtnOnClick = (e: Event) => {
    e.stopPropagation();
    this.setProps({
      mode: 'read',
    });
  };
}
