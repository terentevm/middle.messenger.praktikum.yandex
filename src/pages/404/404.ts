import { ErrorPage } from '../../features/ErrorPage';

export class Page404 extends ErrorPage {
  constructor() {
    super({ code: 404, message: 'Не туда попали', link: '/' });
  }
}
