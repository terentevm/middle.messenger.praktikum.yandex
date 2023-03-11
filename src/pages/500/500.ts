import { ErrorPage } from '../../features/ErrorPage';

const Page500 = () => {

  return ErrorPage({code: 500, message: 'Мы уже фиксим', link: '/chat'});

}

export { Page500 };
