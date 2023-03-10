import Handlebars from 'handlebars';
import avatarNotDefined from './avatarNotDefined.svg';
const template = `
  <div class="avatar">
    {{#if src}}
        <img src="{{src}}" class="avatar__image">
    {{else}}
        <img src="{{avatarNotDefined}}">
    {{/if}}
  </div>
`;

interface AvatarProps {
  src?: string
}
export const Avatar = ({ src }: AvatarProps) => {
  return Handlebars.compile(template)({src: src, avatarNotDefined: avatarNotDefined});
}
