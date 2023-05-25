import { Component } from '../component';
import { ComponentPropType } from '../component/types';
import { Router } from './Router';

export interface PropsWithRouter {
  router: typeof Router;
}

export function withRouter(componentClass: typeof Component<any>) {
  type Props = typeof componentClass extends typeof Component<infer P extends ComponentPropType> ? P : any;

  return class WithRouter extends componentClass {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router: Router.getRouter() });
    }
  }
}
