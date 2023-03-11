import { ContainerWithBackPanel } from '../../features/ContainerWithBackPanel';

import { ChangePasswordForm } from '../../features/ProfileCard';
import { testData } from '../profile/testData';
import testAvatar from '../../images/testAvatar.png';

export const ChangePasswordPage = () => {

  const profileForm = ChangePasswordForm({
    avatar: testAvatar,
    password: "jfshdd5e453w",
    data: testData,
  });

  return ContainerWithBackPanel({children: profileForm})

}
