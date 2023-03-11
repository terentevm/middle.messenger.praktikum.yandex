import { configType, router } from './routerDev';
import { App } from './pages/app/app'
import { LoginPage } from './pages/login/login';
import { SignUpPage } from './pages/signup';
import { Page404 } from './pages/404/404';
import { Page500 } from './pages/500/500';
import { ChatPage } from './pages/chat/chat';
import { ProfilePage } from './pages/profile/profile';
import { ChangePasswordPage } from './pages/changePassword/changePassword';

const routes = new Map;
routes.set('/', App);
routes.set('/login', LoginPage);
routes.set('/signup', SignUpPage);
routes.set('/404', Page404);
routes.set('/500', Page500);
routes.set('/chat', ChatPage);
routes.set('/profile', ProfilePage);
routes.set('/profile/change-password', ChangePasswordPage);
const config : configType = {
  routes: routes
}

const root = document.getElementById('root');

router(config, root);
