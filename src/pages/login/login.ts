import Handlebars from 'handlebars';
import '../../styles/style.sass';
import authFormTmpl from '../../features/AuthForm/AuthForm';
import { PrimaryButton, LinkButton } from '../../components/button/Button';
import { Input } from '../../components/input';

Handlebars.registerPartial('AuthForm', authFormTmpl);

const LoginTemplate = `
  {{#>AuthForm title="Вход"}}
    <div class="authForm__content">
        {{{ LoginInput }}}
        {{{ PasswordInput }}}
    </div>
    <div class="authForm__actions">
        {{{ ButtonAuth }}}
        {{{ ButtonLink }}}
    </div>
  {{/AuthForm }}
`;

const LoginPage = () => {
  const render = Handlebars.compile(LoginTemplate);

  const LoginInput = Input({
    id: 'login_email_input',
    type: 'text',
    name: 'login_input',
    label: 'Логин',
    placeholder: "Логин",
    error: "Неверный логин",
    value: 'test@test.com'
  });

  const PasswordInput = Input({
    id: 'login_pass_input',
    type: 'password',
    name: 'pass_input',
    label: 'Пароль',
    placeholder: "Пароль",
    error: "Неверный пароль"
  });

  const BtnMain = PrimaryButton({
    title: 'Авторизоваться',
    type: 'button'
  });

  const BtnLink = LinkButton({
    title: 'Нет аккаунта?',
    type: 'button'
  });

  return render({
    LoginInput: LoginInput,
    PasswordInput: PasswordInput,
    ButtonAuth: BtnMain,
    ButtonLink: BtnLink
} );
}

export { LoginPage };
