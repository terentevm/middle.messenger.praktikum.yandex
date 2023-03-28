import { ContainerWithBackPanel } from '../../features/ContainerWithBackPanel';

import { ProfileForm } from '../../features/ProfileCard';
import { testData } from './testData';
import testAvatar from '../../images/testAvatar.png';

export const ProfilePage = () => {
  const profileForm = new ProfileForm({
    name: 'Userman',
    avatar: testAvatar,
    data: testData,
    mode: 'read',
  });

  return new ContainerWithBackPanel({ childrenComponent: profileForm });
};
