import { ContainerWithBackPanel } from '../../features/ContainerWithBackPanel';

import { ChangePasswordForm } from '../../features/ProfileCard';
import { testData } from '../profile/testData';
import testAvatar from '../../images/testAvatar.png';

export const ChangePasswordPage = () => {
  const profileForm = new ChangePasswordForm({
    name: 'Userman',
    avatar: testAvatar,
    data: testData,
    mode: 'read',
  });

  return new ContainerWithBackPanel({ childrenComponent: profileForm });
};
