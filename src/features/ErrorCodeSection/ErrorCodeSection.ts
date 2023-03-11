import Handlebars from 'handlebars';
import { ErrorCodeSectionProps } from './types';

const template: string = `
  <section class="codeSection">
    <span class="codeSection__code">{{ code }}</span>
    <span class="codeSection__msg">{{ message }}</span>
    <a href="{{link}}" class="codeSection__link">Назад к чатам</a>
  </section>
`;
const ErrorCodeSection = ({code, message, link}: ErrorCodeSectionProps) => {

  const render = Handlebars.compile(template);
  return render({code, message, link});
}

export { ErrorCodeSection };
