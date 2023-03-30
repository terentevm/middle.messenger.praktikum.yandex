import { ComponentPropType } from '../../classes/component/types';

export interface BadgeProps extends ComponentPropType{
  type: 'primary' | 'secondary';
  content: string;
  size: 'small' | 'medium' | 'large'
}
