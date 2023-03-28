import { Component } from '../classes/component/Component';

export interface configType {
  routes: Map<string, Component>
}

export const router = (config: configType, root: HTMLElement) : void => {
  const currentPath = window.location.pathname;
  const notFound = `<h3>not found page ${currentPath}</h3>`;

  const component = config.routes.get(currentPath);

  if (component) {
    root.appendChild(component.getContent() as Node);
    component.dispatchComponentDidMount();
  } else {
    root.innerHTML = notFound;
  }
};
