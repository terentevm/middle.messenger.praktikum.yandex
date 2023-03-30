import { ComponentPropType } from '../../classes/component/types';

export interface ButtonProps extends ComponentPropType{
  type: 'button'|'submit'|'reset';
  className?: string;
  title: string;
}
