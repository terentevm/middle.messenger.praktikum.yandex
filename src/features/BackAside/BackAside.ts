import Handlebars from 'handlebars';
import { Badge } from '../../components/badge';
import ArrowLeft from 'bundle-text:../../icons/ArrowLeft.svg';
const template: string = `
  <section class="backAside">
    {{{ Badge }}}
  </section>
`;
const BackAside = () => {

  const BadgeElem = Badge({type: "primary", size:"medium", content: ArrowLeft})

  return Handlebars.compile(template)({
    Badge: BadgeElem
  });

}

export { BackAside };
