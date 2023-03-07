import Handlebars from 'handlebars';
import { ErrorCodeSection } from '../../features/ErrorCodeSection';
import { ErrorCodeSectionProps } from '../ErrorCodeSection/types';

const pageTemplate: string = `
  <div class="errorPage">
    {{{ SectionError }}}
  </div>
`;

const ErrorPage = ({code, message, link}: ErrorCodeSectionProps) => {

  const sectionError = ErrorCodeSection({code, message, link});

  const render = Handlebars.compile(pageTemplate);

  return render({
    SectionError: sectionError
  })
}

export { ErrorPage };
