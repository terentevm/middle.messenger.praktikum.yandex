import { BackAside } from '../../features/BackAside';
import Handlebars from 'handlebars';
import { ContainerWithBackPanelType } from './types';
const template: string = `
  <div class="containerProfile">
    {{{ BackAside }}}
    {{{ Children }}}
  </div>
`;

export const ContainerWithBackPanel = ({children, backUrl=""}: ContainerWithBackPanelType) => {

  const backAside = BackAside();

  return Handlebars.compile(template)({
    BackAside: backAside,
    Children: children
  });
}
