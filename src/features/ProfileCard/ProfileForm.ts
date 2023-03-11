import Handlebars from 'handlebars';
import { Avatar } from '../../components/avatar';
import { ProfileFormProps } from './types';
import type { ProfileMode } from './types';
import { ProfileData } from './PorfileData';
import { LinkButton, PrimaryButton } from '../../components/button/Button';
import { Divider } from '../../components/divider';

const headerTemplate = `
  <section class="pofileForm__header">
    {{{ Avatar }}}
    <h4 class="pofileForm__name">{{ name }}</h4>
  </section>
`;

const defaultActionsTemplate = `
  <section class="pofileForm__actions">
  
    {{{ ButtonLinkEditData }}}

    {{{ Divider }}}

    {{{ ButtonLinkChangePass }}}

    {{{ Divider }}}

    {{{ ButtonLinkChangeLogOut }}}

  </section>
`;

const saveActionsTemplate = `
  <section class="pofileForm__save">

    {{{ ButtonSave}}}

  </section>
`;

const template = `
  <div class="pofileForm">
    {{{ ProfileHeader }}}
    {{{ ProfileData }}}
    {{{ Actions }}}
  </div>
`;

const createDefaultActionsSection = () => {

  const divider = Divider();
  const ButtonLinkEditData = LinkButton({title: "Изменить данные", type: 'button', className: 'btn_link_medium'});
  const ButtonLinkChangePass = LinkButton({title: "Изменить пароль", type: 'button', className: 'btn_link_medium'});
  const ButtonLinkChangeLogOut = LinkButton({title: "Выйти", type: 'button', className: 'btn_link_danger btn_link_medium'});

  const context = {
    ButtonLinkEditData,
    ButtonLinkChangePass,
    ButtonLinkChangeLogOut,
    Divider: divider
  }

  return Handlebars.compile(defaultActionsTemplate)(context);
}

const createSaveActionsSection = () => {

  const ButtonSave = PrimaryButton({title: "Сохранить", type: 'button', className: 'btn_large'});

  const context = {
    ButtonSave
  }

  return Handlebars.compile(saveActionsTemplate)(context);
}

export const ProfileForm = ({
  name,
  avatar,
  data
}: ProfileFormProps) => {

  const mode : ProfileMode = "read";
  const avatarEl = Avatar({ src: avatar});

  const headerEl = Handlebars.compile(headerTemplate)({
    Avatar:avatarEl,
    name: name
  });

  const ActionsSection = mode === "edit" ? createSaveActionsSection() : createDefaultActionsSection();

  const profileDataHtml = ProfileData({data: data, mode: mode});
  return Handlebars.compile(template)({
    ProfileHeader:headerEl,
    ProfileData: profileDataHtml,
    Actions: ActionsSection
  })
}
