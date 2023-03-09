import Handlebars from 'handlebars';
import { BackAside } from '../../features/BackAside';
import { ProfileForm } from '../../features/ProfileCard';
import { testData } from './testData';
import testAvatar from '../../images/testAvatar.png';
const template: string = `
  <div class="profile">
    {{{ BackAside }}}
    {{{ ProfileForm }}}
  </div>
`;
export const ProfilePage = () => {

  const backAside = BackAside();
  const profileForm = ProfileForm({name: "Userman", avatar: testAvatar, data: testData});

  return Handlebars.compile(template)({
    BackAside: backAside,
    ProfileForm: profileForm
  });
}