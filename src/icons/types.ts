import { ComponentPropType } from '../classes/component/types';

export interface Icon extends ComponentPropType{
  width?: string;
  height?: string;
  color?: string;
  className? : string;
}
