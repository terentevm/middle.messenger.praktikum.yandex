import { ErrorPage } from '../../features/ErrorPage';
import { Routes } from '../../config';

export class Page500 extends ErrorPage {
  constructor() {
    super({ code: 500, message: 'Мы уже фиксим', link: Routes.main.url });
  }
}
