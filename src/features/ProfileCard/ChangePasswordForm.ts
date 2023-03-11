import Handlebars from 'handlebars';
import { Avatar } from '../../components/avatar';
import { ProfileFormProps } from './types';
import { PrimaryButton } from '../../components/button/Button';
import { Divider } from '../../components/divider';
import { InlineInput } from '../../components/input';

const headerTemplate = `
  <section class="pofileForm__header">
    {{{ Avatar }}}
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
     <section class="pofileForm__data">
      {{{ OldPasswordInput }}}
      {{{ Divider }}}
      {{{ NewPasswordInput }}}
      {{{ Divider }}}
      {{{ NewPasswordRepeatInput }}}
    </section>
    {{{ Actions }}}
  </div>
`;

const createSaveActionsSection = () => {

  const ButtonSave = PrimaryButton({title: "Сохранить", type: 'button', className: 'btn_large'});

  const context = {
    ButtonSave
  }

  return Handlebars.compile(saveActionsTemplate)(context);
}

export const ChangePasswordForm = ({
  avatar,
  password
}: ProfileFormProps) => {

  const avatarEl = Avatar({ src: avatar});

  const headerEl = Handlebars.compile(headerTemplate)({
    Avatar:avatarEl
  });

  const divider = Divider();

  const OldPasswordInput = InlineInput({id: "old_password", name: "oldPassword", value: password, label: "Старый пароль", type: "password" });
  const NewPasswordInput = InlineInput({id: "new_password", name: "newPassword", value: "", label: "Новый пароль", type: "password" });
  const NewPasswordRepeatInput = InlineInput({id: "new_password_repeat", name: "newPasswordRepeat", value: "", label: "Повторите новый пароль", type: "password" });
  const ActionsSection = createSaveActionsSection();

  return Handlebars.compile(template)({
    ProfileHeader:headerEl,
    OldPasswordInput,
    NewPasswordInput,
    NewPasswordRepeatInput,
    Divider: divider,
    Actions: ActionsSection
  })
}
