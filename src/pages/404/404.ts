import { ErrorPage } from '../../features/ErrorPage';

const Page404 = () => {

  return ErrorPage({code: 404, message: 'Не туда попали', link: '/chat'});

}

export { Page404 };
