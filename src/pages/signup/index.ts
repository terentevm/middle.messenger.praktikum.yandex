import Handlebars from 'handlebars';
import { Component } from '../../classes/component/Component';
import { PrimaryButton, LinkButton } from '../../components/button/Button';
import { LoginInput } from '../../components/input';
import { AuthForm } from '../../features/AuthForm/AuthForm';
import { EventType } from '../../classes/component/types';
import { rules } from '../../utils/validationRules';
import { UserController } from '../../controllers/UserController';
import { withRouter } from '../../classes';
import { Routes } from '../../config';

const formContentTemplate = `
  <div class="authForm__content">
    {{{ emailInput }}}
    {{{ loginInput }}}
    {{{ nameInput }}}
    {{{ surnameInput }}}
    {{{ phoneInput }}}
    {{{ passwordInput }}}
    {{{ confirmPasswordInput }}}
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
    this.children.emailInput = LoginInput({
      id: 'signup_email_input',
      type: 'email',
      name: 'email',
      label: 'Почта',
      placeholder: 'Почта',
      error: '',
      value: '',
      validate: true,
      required: true,
      pattern: rules.email,
      onErrorMsg: 'Неверная почта',
    });

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

    this.children.nameInput = LoginInput({
      id: 'signup_name_input',
      type: 'text',
      name: 'first_name',
      label: 'Имя',
      placeholder: 'Имя',
      error: '',
      value: '',
      validate: true,
      required: true,
      pattern: rules.firstName,
      onErrorMsg: 'Имя указано не верно',
    });

    this.children.surnameInput = LoginInput({
      id: 'signup_surname_input',
      type: 'text',
      name: 'second_name',
      label: 'Фамилия',
      placeholder: 'Фамилия',
      error: '',
      value: '',
      validate: true,
      required: true,
      pattern: rules.secondName,
      onErrorMsg: 'Фамилия указана не верно',
    });

    this.children.phoneInput = LoginInput({
      id: 'signup_phone_input',
      type: 'tel',
      name: 'phone',
      label: 'Телефон',
      placeholder: 'Телефон',
      error: '',
      value: '',
      validate: true,
      required: true,
      pattern: rules.phone,
      onErrorMsg: 'Телефон указан не верно',
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

    this.children.confirmPasswordInput = LoginInput({
      id: 'login_pass_rep__input',
      type: 'password',
      name: 'password_repeat',
      label: 'Пароль (еще раз)',
      placeholder: 'Пароль (еще раз)',
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
      title: 'Зарегистрироваться',
      type: 'submit',
    });

    this.children.buttonLink = new LinkButton({
      title: 'Войти',
      to: Routes.login.url,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(formActionsTemplate), { ...this._props });
  }
}

class SignUpPage extends Component{
  constructor(props: any) {
    super(props);
  }

  init() {
    this.children.authFrom = new AuthForm({
      title: 'Регистрация',
      formContent: new FormContent(),
      formActions: new FormActions(),
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          const userData = AuthForm.getData(e.target as HTMLFormElement);
          (new UserController()).register(userData).then(()=>{
            this.router && this.router.go(Routes.login.url);
          }).catch((err => {
            console.error(err);
            alert('Ошибка Http запроса');
          }));
        }
      } as EventType,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile('{{{ authFrom }}}'), this._props);
  }
}

export default withRouter(SignUpPage);
