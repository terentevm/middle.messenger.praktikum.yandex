import { WSConnector } from '../classes';
import { store } from '../classes/Store';
import { WSTransportEvents } from '../classes/WSConnector/WSConnector';
import { MessageInfo } from '../types';

class MessageController {

  private _sockets: Map<number, WSConnector> = new Map();

  async connect(chatId: number, chatToken: string) {
    // @ts-ignore
    if (this._sockets[chatId]) {
      return;
    }

    const userId = store.getState().user.id;
    console.log(`ws connect ${userId}/${chatId}/${chatToken}`);
    const wsTransport = new WSConnector(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${chatToken}`);

    this._sockets.set(chatId, wsTransport);

    await wsTransport.connect();

    this.subscribe(wsTransport, chatId);
    this.fetchOldMessages(chatId);

  }

  async subscribe(connector: WSConnector, chatId: number) {
    connector.on(WSTransportEvents.Message, (message) => this.onMessage(chatId, message));
    connector.on(WSTransportEvents.Close, () => this.onClose(chatId));
  }

  sendMessage(chatId: number, message: string) {
    console.log(this);
    const socket = this._sockets.get(chatId);

    if (!socket) {
      throw new Error(`Chat ${chatId} is not connected`);
    }

    socket.send({
      type: 'message',
      content: message,
    });
  }

  fetchOldMessages(chatId: number) {
    console.log('fetch old messages');
    const socket = this._sockets.get(chatId);

    if (!socket) {
      throw new Error(`Chat ${chatId} is not connected`);
    }

    socket.send({type: 'get old', content: '0'});
  }

  onMessage(chatId: number,  messages: MessageInfo | MessageInfo[]) {
    console.log('onMessage');
    console.log(messages);
    console.log(chatId);
    let messagesToAdd: MessageInfo[] = [];

    if (Array.isArray(messages)) {
      messagesToAdd = messages.reverse();
    } else {
      messagesToAdd.push(messages);
    }

    const currentMessages = (store.getState().messages || {})[chatId] || [];

    messagesToAdd = [...currentMessages, ...messagesToAdd];

    const currentState = store.getState();

    const newMessages = {...currentState.messages};
    newMessages[chatId] = messagesToAdd;
    store.updateState({
      ...currentState,
      messages: newMessages
    })

  }

  onClose(chatId: number) {
    console.log(`close chat connection for chat ${chatId}`);
    this._sockets.delete(chatId);
  }
}

const controller = new MessageController();

// @ts-ignore
window.WSController = controller;

export default controller;
