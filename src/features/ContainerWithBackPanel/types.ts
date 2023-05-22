import { Component } from '../../classes/component/Component';
import { ComponentPropType } from '../../classes/component/types';

export interface ContainerWithBackPanelType extends ComponentPropType {
  childrenComponent: Component,
  backUrl?: string
}
