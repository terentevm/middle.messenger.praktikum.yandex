import { ErrorPage } from '../../features/ErrorPage';

export class Page500 extends ErrorPage {
  constructor() {
    super({ code: 500, message: 'Мы уже фиксим', link: '/' });
  }
}
