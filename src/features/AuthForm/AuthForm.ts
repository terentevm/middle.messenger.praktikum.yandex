import Handlebars from 'handlebars';
import { Component } from '../../classes/component/Component';
import { ComponentPropType } from '../../classes/component/types';

const template = `
  <form class="authForm">
    <h2 class="authForm__title">{{ title }}</h2>
    {{{ formContent }}}
    {{{ formActions }}}
  </form>
`;

export default template;

export interface AuthFormProps extends ComponentPropType {
  title: string;
  formContent: Component;
  formActions: Component;
}
export class AuthForm extends Component<AuthFormProps> {
  constructor(props: AuthFormProps) {
    super(props);
  }

  protected override render() : DocumentFragment {
    return this.compile(Handlebars.compile(template), { ...this._props });
  }

  static getData(form: HTMLFormElement) {
    const formData = new FormData(form);
    const entries: Array<[string, any]> = [];

  // @ts-ignore
    for (const key of formData.keys()) {
      const value = formData.get(key);
      entries.push([key, value]);
    }

    return Object.fromEntries(entries);
  }
}
