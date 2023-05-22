import { ComponentPropType } from '../../classes/component/types';
import { Component } from '../../classes';

export interface ButtonProps extends ComponentPropType{
  type: 'button'|'submit'|'reset';
  className?: string;
  title?: string;
  icon?: Component;
  fullWidth?: boolean,
}

export interface LinkProps extends ComponentPropType{
  className?: string;
  title: string;
  to?: string;
  type: 'button' | 'link',
  icon?: Component
}
