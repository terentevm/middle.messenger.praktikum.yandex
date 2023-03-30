import { ErrorPage } from '../../features/ErrorPage';

const Page500 = new ErrorPage({ code: 500, message: 'Мы уже фиксим', link: '/chat' });

export { Page500 };
