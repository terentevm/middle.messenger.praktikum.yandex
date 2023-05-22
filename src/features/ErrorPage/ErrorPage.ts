import Handlebars from 'handlebars';
import { Component } from '../../classes/component/Component';
import { ErrorCodeSection } from '../ErrorCodeSection';
import { ErrorCodeSectionProps } from '../ErrorCodeSection/types';

const pageTemplate = `
  <div class="errorPage">
    {{{ sectionError }}}
  </div>
`;

class ErrorPage extends Component<ErrorCodeSectionProps> {
  constructor(props: ErrorCodeSectionProps) {
    super(props);
  }

  init() {
    this.children.sectionError = new ErrorCodeSection(this._props);
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(pageTemplate), this._props);
  }
}

export { ErrorPage };
