export type CallbackType = (...arg: any) => void;

export type ListenersType = {[key: string]: Array<CallbackType> };

export interface IEventBus {
  on: (event: string, callback: CallbackType) => void;
  off: (event: string, callback: CallbackType) => void
  emit: (event: string, ...args: any[]) => void;
}
