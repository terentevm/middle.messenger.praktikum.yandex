import { ContainerWithBackPanel } from '../../features/ContainerWithBackPanel';

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

  const profileForm = ProfileForm({
    name: "Userman",
    avatar: testAvatar,
    data: testData,
    password: "jfshdd5e453w"
  });

  return ContainerWithBackPanel({children: profileForm})

}
