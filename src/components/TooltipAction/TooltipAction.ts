import { Component } from '../../classes';
import { ComponentPropType } from '../../classes/component/types';

const template = `
  <div class="action">
    <div class="action__icon">{{{ icon }}}</div>
    <span class="action__text">{{ text }}</span>
  </div>
`;
export interface ITooltipActionProps extends ComponentPropType {
  icon: Component;
  text: string;
}

export class TooltipAction extends Component<ITooltipActionProps> {
  constructor({text, icon, events}: ITooltipActionProps) {
    super({text, icon, events});
  }

  protected render(): DocumentFragment {
    return this.renderTemplate(template, this._props);
  }
}
