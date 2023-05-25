import Handlebars from 'handlebars';
import { Component } from '../../classes/component/Component';
import { AvatarProps } from './types';
import avatarNotDefined from './avatarNotDefined.svg';

const template = `
  <label for="{{ id }}" class="avatar">
    <input type="file" class="avatar__input" id="{{ id }}" />
    {{#if src}}
        <img src="{{src}}" class="avatar__image" alt="user avatar">
    {{else}}
        <img src="{{avatarNotDefined}}" alt="Default avatar image">
    {{/if}}
   </label>
`;

export class Avatar extends Component<AvatarProps> {
  constructor(props: AvatarProps) {
    console.log(props);
    super({ ...props, avatarNotDefined });


  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), this._props);
  }
}
