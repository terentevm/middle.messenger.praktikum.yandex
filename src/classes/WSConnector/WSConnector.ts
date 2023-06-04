import { EventBus } from '../eventBus';

export enum WSTransportEvents {
  Connected = 'connected',
  Error = 'error',
  Message = 'message',
  Close = 'close',
}

export class WSConnector extends EventBus {

  private socket: WebSocket | null = null;
  private pingInterval: number = 0;
  private url: string = '';

  constructor(url: string) {
    super();

    this.url = url;
  }

  public send(data: unknown) {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }

    this.socket.send(JSON.stringify(data))
  }

  public connect(): Promise<void> {
    console.log(`web socket connet to url ${this.url}`)
    this.socket = new WebSocket(this.url);

    this.subscribe(this.socket);

    this.setupPing();

    return new Promise((resolve) => {
      this.on(WSTransportEvents.Connected, () => {
       this.send({ type: 'ping' });
        resolve();
      });
    });
  }

  public close() {
    this.socket?.close();
  }

  private setupPing() {
    this.pingInterval = Number(setInterval(() => {
      this.send({ type: 'ping' });
    }, 5000));

    this.on(WSTransportEvents.Close, () => {
      clearInterval(this.pingInterval);

      this.pingInterval = 0;
    })
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      console.log('socket is opened');
      this.emit(WSTransportEvents.Connected)
    });
    socket.addEventListener('close', (event) => {
      console.log('emit close connection')
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
      this.emit(WSTransportEvents.Close)
    });

    socket.addEventListener('error', (e) => {
      this.emit(WSTransportEvents.Error, e)
    });

    socket.addEventListener('message', (message) => {
      const data = JSON.parse(message.data);

      if (data.type && data.type === 'pong') {
        return false;
      }

      this.emit(WSTransportEvents.Message, data);

      return false;
    });
  }
}
