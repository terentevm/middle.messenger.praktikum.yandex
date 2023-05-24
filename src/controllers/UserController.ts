import { Connector } from '../classes';
import { HTTP_API_ENUM } from '../config';
import { store } from '../classes/Store'
import { User } from '../types';
export class UserController {
  private api: Connector;

  constructor() {
    this.api = new Connector();
  }

  async register(userData: any) {
     return this.api.post(HTTP_API_ENUM.signup, userData);
  }

  async login(userData: any) {
    await this.api.post(HTTP_API_ENUM.login, userData);
    await this.getUser();
  }

  async logout() {
    return this.api.post(HTTP_API_ENUM.logout);
  }

  async getUser() : Promise<void> {
    return this.api.get(HTTP_API_ENUM.getUser).then((user: User) => {
      store.updateState({ user: user});
    });
  }

  async updateProfile(user: User): Promise<void> {
     const resUser = await this.api.put(HTTP_API_ENUM.updateProfile, user);
     store.updateState({ user: resUser});
  }

  async changePassword(passwordData: { oldPassword: string, newPassword: string}): Promise<void> {
     await this.api.put(HTTP_API_ENUM.changePassword, passwordData);
     const user = store.getState().user;

     store.updateState({ user: {...user, password: passwordData.newPassword}});
  }

  async updateAvatar(form: FormData) {
    const user = await this.api.sendFile(HTTP_API_ENUM.updateAvatar, 'PUT', form);
    store.updateState({ user: user});
  }


}
