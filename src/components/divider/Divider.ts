import Handlebars from 'handlebars';

const template = `<div class="divider"></div>`;
export const Divider = () => {
  return Handlebars.compile(template)({});
}
