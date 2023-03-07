import Handlebars from 'handlebars';
import { BackAside } from '../../features/BackAside';

const template: string = `
  <div class="profile">
    {{{ BackAside }}}
  </div>
`;
export const ProfilePage = () => {

  const backAside = BackAside();

  return Handlebars.compile(template)({
    BackAside: backAside
  });
}