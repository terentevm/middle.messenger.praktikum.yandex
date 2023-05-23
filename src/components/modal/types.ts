import { ComponentPropType } from '../../classes/component/types';
import { Component } from '../../classes';

export interface IModal extends ComponentPropType {
  content?: Component | null;
  visible: boolean;
  className?: string;
  onClose?: () => void;
}
