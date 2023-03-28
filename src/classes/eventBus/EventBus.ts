import { IEventBus, ListenersType, CallbackType } from './types';

class EventBus implements IEventBus {
  private _listeners: ListenersType;

  constructor() {
    this._listeners = {};
  }

  on(event: string, callback: CallbackType): void {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    this._listeners[event].push(callback);
  }

  off(event: string, callback: CallbackType): void {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this._listeners[event] = this._listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit(event: string, ...args: any[]): void {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this._listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}

export { EventBus };
