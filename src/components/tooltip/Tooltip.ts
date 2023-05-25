import { Component } from '../../classes';
import { IconButton } from '../button';
import { TooltipMenu } from '../../icons';
import { ComponentPropType, EventType } from '../../classes/component/types';

const template = `
  <div class="tooltip">
    {{{ ButtonMenu }}}
    <div class="{{ contentClassName }}">
        {{{ content }}}
    </div>
  </div>
`;

export interface ITooltipProps extends  ComponentPropType {
  visible: boolean;
  content: Component | Component[]
}

export class Tooltip extends Component{
  constructor(props: ITooltipProps) {
    super(props);
  }

  protected init() {

    this._props.contentClassName = this.getClassList();
    const menuIcon = new TooltipMenu({});

    this.children.ButtonMenu = new IconButton({
      icon: menuIcon,
      type: 'button',
      events: {
        click: this.tooltipBtnOnClick.bind(this)
      } as EventType
    });

  }

  protected componentDidUpdate(oldProps?: ITooltipProps, newProps?: ITooltipProps): boolean {

    if (oldProps?.visible !== newProps?.visible) {
      this.setProps({
        contentClassName: this.getClassList()
      });
    }

    return  true;
  }

  protected render(): DocumentFragment {
    return this.renderTemplate(template, this._props);
  }

  tooltipBtnOnClick() {
    this.setProps({
      visible: !this._props.visible
    })
  }

  getClassList() {
    const classes = ['tooltip__content'];
    this._props.visible ? classes.push('tooltip_visible') : classes.push('tooltip_hidden');
    return classes.join(' ');
  }
}
