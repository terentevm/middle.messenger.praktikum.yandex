import { v4 as makeUUID } from 'uuid';
import { EventBus } from '../eventBus';
import { IEventBus } from '../eventBus/types';
import {
  EventsMapType, ComponentPropType, ChildrenType, EventType,
} from './types';

class Component<PropType extends ComponentPropType = any> {
  eventBus: () => IEventBus;

  _props: PropType;

  element: HTMLElement | null = null;

  _id: string;

  children: ChildrenType;

  tagName: string;

  static EVENTS : EventsMapType = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  constructor(tagName = 'div', propsWithChildren: PropType = {} as PropType) {
    this._id = makeUUID();
    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this._props = this.createProxy(props);
    this.children = children;

    this.tagName = tagName;
    const eventBus = new EventBus();
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT);
  }

  private _getChildrenAndProps = (propsWithChildren: PropType) => {
    const props: PropType = {} as PropType;
    const children: ChildrenType = {};
    Object.entries(propsWithChildren).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0
        && value.every((val) => val instanceof Component)) {
        children[key as string] = value;
      } else if (value instanceof Component) {
        children[key as string] = value;
      } else {
        props[key as keyof typeof propsWithChildren] = value;
      }
    });

    return { props, children };
  };

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Component.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    this.element = this._createDocumentElement(this.tagName);
  }

  private _init() {
    this.init();

    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  _componentDidMount() {
    this.componentDidMount();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected componentDidMount(oldProps?: PropType) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Component.EVENTS.FLOW_CDM);
    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => ch.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  _componentDidUpdate(oldProps: PropType, newProps: PropType) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }

    this._removeEvents();

    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected componentDidUpdate(oldProps?: PropType, newProps?: PropType) : boolean {
    return true;
  }

  _createDocumentElement(tagName: string) {
    const el = document.createElement(tagName);
    el.setAttribute('data-id', this._id);
    return el;
  }

  getContent() {
    return this.element;
  }

  getId(): string {
    return this._id;
  }

  _addEvents = () => {
    const events = this._props?.events || {} as EventType;

    Object.keys(events).forEach((eventName: keyof GlobalEventHandlersEventMap) => {
      this.element?.addEventListener(eventName, events[eventName]);
    });
  };

  _removeEvents = () => {
    const events = this._props?.events || {} as EventType;

    Object.keys(events).forEach((eventName: keyof GlobalEventHandlersEventMap) => {
      this.element?.removeEventListener(eventName, events[eventName]);
    });
  };

  _render = () => {
    const fragment = this.render();

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this.element && newElement) {
      this.element.replaceWith(newElement);
    }

    this.element = newElement;

    this._addEvents();
  };

  protected render() : DocumentFragment {
    return new DocumentFragment();
  }

  compile = (template: (context: any) => string, context: any) => {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map((child) => `<div data-id="${child.getId()}"></div>`);
      } else {
        contextAndStubs[name] = `<div data-id="${component.getId()}"></div>`;
      }
    });

    const html = template(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;

    const replaceStub = (component: Component<PropType>) => {
      const stub = temp.content.querySelector(`[data-id="${component.getId()}"]`);

      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent() as Node);
    };

    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach(replaceStub);
      } else {
        replaceStub(component);
      }
    });

    return temp.content;
  };

  setProps = (nextProps: Partial<PropType>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this._props, nextProps);
  };

  createProxy(target: PropType) {
    return new Proxy(target, this._getProxyHandler());
  }

  private _getProxyHandler() : ProxyHandler<any> {
    return {
      set: (target: PropType, prop: string | symbol, newVal: any) : boolean => {
        const oldTarget = { ...target };
        target[prop as keyof typeof target] = newVal;
        if (this.element) {
          console.log(`changed prop: ${prop as string} emit rerender `);
          this.eventBus().emit(Component.EVENTS.FLOW_CDU, oldTarget, target);
        }

        return true;
      },
      get: (target, prop) => {
        if (typeof target[prop] === 'function') {
          return target[prop].bind(this);
        } if (typeof target[prop] === 'object') {
          return this.createProxy(target[prop]);
        }
        return target[prop];
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    };
  }

  addClass(className: string) {
    if (this.element instanceof HTMLElement) {
      this.element.classList.add(className);
    }
  }

  removeClass(className: string) {
    if (this.element instanceof HTMLElement) {
      this.element.classList.remove(className);
    }
  }

  toggleClass(className: string) {
    if (this.element instanceof HTMLElement) {
      this.element.classList.toggle(className);
    }
  }
}

export { Component };
