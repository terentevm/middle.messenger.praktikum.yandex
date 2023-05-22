export enum HTTP_API_ENUM {
  signup = '/auth/signup',
  login = '/auth/signin',
  getUser = '/auth/user',
  logout = '/auth/logout',
  updateProfile = '/user/profile',
  updateAvatar = '/user/profile/avatar',
  changePassword = '/user/password',
  searchUser = '/user/search',
  //chats api
  chatRest = '/chats',
  chatGetToken = '/chats/token',
  addUserToChat = '/chats/users'
}

export const Routes: {[key: string] : { url: string; protected: boolean;}} =  {
  main: {
    url: '/',
    protected: true,
  },
  login: {
    url: '/login',
    protected: false,
  },
  signup: {
    url: '/signup',
    protected: false,
  },
  profile: {
    url: '/profile',
    protected: false,
  },
  pofileChangePassword: {
    url: '/profile/change-password',
    protected: false,
  },
  notFound: {
    url: '/404',
    protected: false,
  },
  serverError: {
    url: '/500',
    protected: false,
  },
} as const;
