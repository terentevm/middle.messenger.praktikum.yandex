import { Route } from './Route';
import { Constructor } from './types';
import { Component } from '../component';

export class Router {
  private static __instance: Router;
  private routes: Route[];
  private history: History;
  private _currentRoute: null | Route;
  private _rootQuery: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: Constructor<Component>) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      event.currentTarget && this._onRoute((event.currentTarget as Window).location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    let route = this.getRoute(pathname);
    if (!route) {
      route = this.getRoute('/404');
      if (!route) {
        return;
      }
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }

  static getRouter() {
    return Router.__instance;
  }
}
