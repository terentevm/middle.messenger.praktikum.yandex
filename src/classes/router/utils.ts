import { Component } from '../component';

export function render(query: string, block: Component) {
  const root = document.querySelector(query) as HTMLElement;
  root.appendChild(block.getContent() as Node);
  return root;
};
