import { ComponentPropType } from '../../classes/component/types';
import { User } from '../../types';

export interface HeaderProps extends ComponentPropType {
  withName: boolean;
}

export type ProfileDataType = {
  email: string;
  login: string;
  password: string;
  firstName: string;
  secondName: string;
  displayName: string;
  phone: string;
}

export type ProfileMode = 'edit' | 'read';

export interface ProfileDataProps extends ComponentPropType {
  data: User;
  mode: ProfileMode;
}

export interface ProfileFormProps extends ComponentPropType {
  user: User,
  mode: ProfileMode;
}
