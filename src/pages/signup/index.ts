import Handlebars from 'handlebars';
import '../../styles/style.sass';
import authFormTmpl from '../../features/AuthForm/AuthForm';
import { PrimaryButton, LinkButton } from '../../components/button/Button';
import { Input } from '../../components/input';

Handlebars.registerPartial('AuthForm', authFormTmpl);

const LoginTemplate = `
  {{#>AuthForm title="Регистрация"}}
    <div class="authForm__content">
        {{{ MailInput }}}
        {{{ LoginInput }}}
        {{{ NameInput }}}
        {{{ LoginInput }}}
        {{{ SurnameInput }}}
        {{{ PhoneInput }}}
        {{{ PasswordInput }}}
        {{{ ConfirmPasswordInput }}}
    </div>
    <div class="authForm__actions">
        {{{ ButtonAuth }}}
        {{{ ButtonLink }}}
    </div>
  {{/AuthForm }}
`;

const SignUpPage = () => {
  const render = Handlebars.compile(LoginTemplate);

  const MailInput = Input({
    id: 'signup_email_input',
    type: 'email',
    name: 'email',
    label: 'Почта',
    placeholder: "Почта",
    //error: "Неверная почта",
    value: 'Test123'
  });

  const LoginInput = Input({
    id: 'signup_login_input',
    type: 'text',
    name: 'login',
    label: 'Логин',
    placeholder: "Логин",
    error: "Неверный логин",
    value: 'Test123'
  });

  const NameInput = Input({
    id: 'signup_name_input',
    type: 'text',
    name: 'first_name',
    label: 'Имя',
    placeholder: "Имя",
    error: "Имя не заполнено"
  });

  const SurnameInput = Input({
    id: 'signup_surname_input',
    type: 'text',
    name: 'second_name',
    label: 'Фамилия',
    placeholder: "Фамилия",
    error: "Фамилия не указана",
    //value: ''
  });

  const PhoneInput = Input({
    id: 'signup_phone_input',
    type: 'tel',
    name: 'phone',
    label: 'Телефон',
    placeholder: "Телефон",
    error: "Телефон не указан",
    //value: ''
  });

  const PasswordInput = Input({
    id: 'login_pass_input',
    type: 'password',
    name: 'password',
    label: 'Пароль',
    placeholder: "Пароль",
    error: "Неверный пароль"
  });

  const ConfirmPasswordInput = Input({
    id: 'login_pass_rep__input',
    type: 'password',
    name: 'password_repeat',
    label: 'Пароль (еще раз)',
    placeholder: "Пароль (еще раз)",
    error: "Пароль не совпадает"
  });
  const BtnMain = PrimaryButton({
    title: 'Зарегистрироваться',
    type: 'button'
  });

  const BtnLink = LinkButton({
    title: 'Войти',
    type: 'button'
  });

  return render({
    MailInput: MailInput,
    LoginInput: LoginInput,
    NameInput: NameInput,
    SurnameInput: SurnameInput,
    PhoneInput: PhoneInput,
    PasswordInput: PasswordInput,
    ConfirmPasswordInput: ConfirmPasswordInput,
    ButtonAuth: BtnMain,
    ButtonLink: BtnLink
} );
}

export { SignUpPage };
