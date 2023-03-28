import Handlebars from 'handlebars';
import { Component } from '../../classes/component/Component';

const template = `
  <nav class="app__links">
    <a href="/chat">Страница чата</a>
    <a href="/profile">Профиль</a>
    <a href="/profile/change-password">Страница смены пароля</a>
    <a href="/login">Вход</a>
    <a href="/signup">Регистрация</a>
    <a href="/404">404</a>
    <a href="/500">500</a>
  </nav>
`;

export class App extends Component {
  constructor() {
    super('nav', {});
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), {});
  }
}
