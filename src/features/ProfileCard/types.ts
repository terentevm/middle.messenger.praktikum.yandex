import { ComponentPropType } from '../../classes/component/types';
import { Component } from '../../classes/component/Component';

export interface HeaderProps extends ComponentPropType {
  Avatar: Component;
  withName: boolean;
  name?: string;
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
  data: ProfileDataType;
  mode: ProfileMode;
}

export interface ProfileFormProps extends ComponentPropType {
  name?: string | undefined;
  avatar?: string | undefined;
  data: ProfileDataType;
  mode: ProfileMode;
}
