import { Component } from '../component';
import { render } from './utils';
import { Constructor } from './types';

export class Route {
  private _pathname: string;
  private _componentClass: Constructor<Component>;
  private _component: Component |null;
  private _props: any;

  constructor(pathname: string, component: Constructor<Component>, props: any) {
    this._pathname = pathname;
    this._componentClass = component;
    this._component = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._component) {
      this._component.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._component) {
      this._component = new this._componentClass();
      render(this._props.rootQuery, this._component);
      return;
    }

    this._component.show();
  }
}
