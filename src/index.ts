import './styles/style.scss';
import { Routes } from './config';
import { Router } from './classes';
import LoginPage from './pages/login/login';
import SignUpPage from './pages/signup';
import { Page404 } from './pages/404/404';
import { Page500 } from './pages/500/500';
import ChatPage from './pages/chat/chat';
import { ProfilePage } from './pages/profile/profile';
import { ChangePasswordPage } from './pages/changePassword/changePassword';
import { UserController } from './controllers/UserController';
import { store } from './classes/Store';

const router = new Router('#root');

async function checkIsAuth() : Promise<boolean> {
  if (!store.getState().user) {
    try {
      await (new UserController()).getUser();
    } catch (e) {
      return false;
    }

  }

  return !!store.getState().user;
}

window.addEventListener('DOMContentLoaded', async () => {

  const isAuth = await checkIsAuth();
  const path = window.location.pathname;

  let isProtectedRoute = false;

  for (let route of Object.keys(Routes)) {
    if (Routes[route].url === path && Routes[route].protected) {
      isProtectedRoute = true;
    }
  }

  router.use(Routes.main.url, ChatPage);
  router.use(Routes.login.url, LoginPage);
  router.use(Routes.signup.url, SignUpPage);
  router.use(Routes.profile.url, ProfilePage);
  router.use(Routes.pofileChangePassword.url, ChangePasswordPage);
  router.use(Routes.notFound.url, Page404);
  router.use(Routes.serverError.url, Page500);
  if (isProtectedRoute && !isAuth) {
    router.go(Routes.login.url);
  }
  router.start();
});
