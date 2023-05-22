import Handlebars from 'handlebars';
import { Component } from '../../classes/component/Component';
import { PrimaryButton, LinkButton } from '../../components/button/Button';
import { LoginInput } from '../../components/input';
import { AuthForm } from '../../features/AuthForm/AuthForm';
import { EventType } from '../../classes/component/types';
import { rules } from '../../utils/validationRules';
import { withRouter } from '../../classes';
import { Routes } from '../../config';
import { UserController } from '../../controllers/UserController';

const formContentTemplate = `
  <div class="authForm__content">
    {{{ loginInput }}}
    {{{ passwordInput }}}
  </div>
`;

const formActionsTemplate = `
  <div class="authForm__actions">
    {{{ buttonAuth }}} 
    {{{ buttonLink }}}    
  </div>
`;

class FormContent extends Component {
  protected init() {
    this.children.loginInput = LoginInput({
      id: 'login_email_input',
      type: 'text',
      name: 'login',
      label: 'Логин',
      placeholder: 'Логин',
      error: '',
      value: '',
      validate: true,
      required: true,
      pattern: rules.login,
      onErrorMsg: 'Неверный логин',
    });

    this.children.passwordInput = LoginInput({
      id: 'login_password_input',
      type: 'password',
      name: 'password',
      label: 'Пароль',
      placeholder: 'Пароль',
      error: '',
      value: '',
      validate: true,
      required: true,
      pattern: rules.password,
      onErrorMsg: 'Неверный пароль',
    });
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(formContentTemplate), { ...this._props });
  }
}

class FormActions extends Component {
  protected init() {
    this.children.buttonAuth = new PrimaryButton({
      title: 'Авторизоваться',
      type: 'submit',
    });

    this.children.buttonLink = new LinkButton({
      title: 'Нет аккаунта?',
      to: Routes.signup.url,
      type: 'button'
    });
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(formActionsTemplate), { ...this._props });
  }
}

class LoginPage extends Component {
  constructor(props: any) {
    super(props);
  }

  init() {
    this.children.authFrom = new AuthForm({
      title: 'Вход',
      formContent: new FormContent(),
      formActions: new FormActions(),
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          const userData = AuthForm.getData(e.target as HTMLFormElement);
          (new UserController().login(userData)).then(()=>{
            this.router && this.router.go(Routes.profile.url);
          }).catch((err => {
            console.error(err);
            alert('Ошибка Http запроса');
          }));
        },
      } as EventType,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile('{{{ authFrom }}}'), this._props);
  }

}
export default withRouter(LoginPage);
