import Handlebars from 'handlebars';
import { BadgeProps } from './types';
import { Component } from '../../classes/component/Component';

const template = `
  <div class="{{ classList }}">
    <img src={{ content }} alt="badge icon"/>
  </div>
`;

class Badge extends Component<BadgeProps> {
  constructor({ type = 'primary', content = '', size = 'small', ...props }: BadgeProps) {
    super({ type, content, size, ...props });
  }

  protected render(): DocumentFragment {
    const classArr = [`badge badge_${this._props.size}`];
    if (this._props.type === 'primary') classArr.push('badge_primary');

    const classList = classArr.join(' ');

    return this.compile(Handlebars.compile(template), { ...this._props, classList });
  }
}
export { Badge };
