import Handlebars from 'handlebars';
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

interface AvatarProps {
  src?: string
}
export const Avatar = ({ src }: AvatarProps) => {
  return Handlebars.compile(template)({src: src, avatarNotDefined: avatarNotDefined});
}
