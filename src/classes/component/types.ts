import { Component } from './Component';

type EventNames = keyof GlobalEventHandlersEventMap;

export type EventType = {
  [key in EventNames]: (e?: Event) => void;
};

export interface ComponentPropType {
  events?: EventType;
  [index: string]: any;
}

export type MetaType<T> = {
  tagName: string;
  props: T
}

export type EventsMapType = {
  [key: string]: string;
};

export type ChildrenType = Record<
  string,
  Component<any> | Component<any> []
>;
