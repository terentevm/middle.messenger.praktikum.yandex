export interface configType {
  routes: Map<string, ()=>string>
}

export const router = (config: configType, root: HTMLElement) : void => {
  const currentPath = window.location.pathname;
  const notFound = `<h3>not found page ${currentPath}</h3>`;

  const component = config.routes.get(currentPath);

  if (component) {
    root.innerHTML = component();
  } else {
    root.innerHTML = notFound;
  }

}