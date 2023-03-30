import { ErrorPage } from '../../features/ErrorPage';

const Page404 = new ErrorPage({ code: 404, message: 'Не туда попали', link: '/chat' });

export { Page404 };
