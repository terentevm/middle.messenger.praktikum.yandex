import { ComponentPropType } from '../../classes/component/types';

export interface LabelPropType extends ComponentPropType {
  title: string;
  labelFor: string;
  className?: string;
}
