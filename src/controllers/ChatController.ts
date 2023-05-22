import { Connector } from '../classes';
import { HTTP_API_ENUM } from '../config';
import { store } from '../classes/Store';

class ChatController {
  private api: Connector;

  constructor() {
    this.api = new Connector();
  }

  async all() {
    const chats = await this.api.get(HTTP_API_ENUM.chatRest);
    store.updateState({
      ...store.getState(),
      chatList: chats
    })
  }

  async create(title: string) {
    return this.api.post(HTTP_API_ENUM.chatRest, { title });
  }

  delete(chatId: number) {
    return this.api.delete(HTTP_API_ENUM.chatRest, { chatId});
  }

  getChatToken(chatId: number) {
    return this.api.post(`${HTTP_API_ENUM.chatGetToken}/${chatId}`);
  }

  searchUsers(login: string) {
    return this.api.post(HTTP_API_ENUM.searchUser, {login: login});
  }

  addUserToChat(chatId: number, userId: number) {
    return this.api.put(HTTP_API_ENUM.addUserToChat, {
      chatId: chatId,
      users: [
        userId
      ]
    });
  }
}

export default new ChatController();
