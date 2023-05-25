import Handlebars from 'handlebars';
import { ErrorCodeSectionProps } from './types';
import { Component } from '../../classes/component/Component';

const template = `
  <section class="codeSection">
    <span class="codeSection__code">{{ code }}</span>
    <span class="codeSection__msg">{{ message }}</span>
    <a href="{{link}}" class="codeSection__link">Назад к чатам</a>
  </section>
`;

class ErrorCodeSection extends Component<ErrorCodeSectionProps> {
  constructor(props: ErrorCodeSectionProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), this._props);
  }
}

export { ErrorCodeSection };
