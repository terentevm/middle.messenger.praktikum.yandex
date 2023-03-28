import { ComponentPropType } from '../../classes/component/types';

export interface ErrorCodeSectionProps extends ComponentPropType{
  code: number;
  message: string;
  link: string
}
