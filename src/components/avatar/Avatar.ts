import Handlebars from 'handlebars';
import { Component } from '../../classes/component/Component';
import { AvatarProps } from './types';
import avatarNotDefined from './avatarNotDefined.svg';

const template = `
  <div class="avatar" name="avatar">
    {{#if src}}
        <img src="{{src}}" class="avatar__image" alt="user avatar">
    {{else}}
        <img src="{{avatarNotDefined}}" alt="Default avatar image">
    {{/if}}
  </div>
`;

export class Avatar extends Component<AvatarProps> {
  constructor(props: AvatarProps) {
    super('div', { ...props, avatarNotDefined });
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), this._props);
  }
}
