import { ErrorPage } from '../../features/ErrorPage';
import { Routes } from '../../config';

export class Page404 extends ErrorPage {
  constructor() {
    super({ code: 404, message: 'Не туда попали', link: Routes.main.url });
  }
}
