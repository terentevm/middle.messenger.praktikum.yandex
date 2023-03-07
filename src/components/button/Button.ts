import Handlebars from 'handlebars';
import { ButtonProps } from './types';

export const template : string = `
  <button
    type="{{type}}"
    class="{{className}}"
  >{{title}}
  </button>
`;

export const Button = ({ title, className, type="button"}: ButtonProps) => {
  const render = Handlebars.compile(template);

  return render({ title, className, type})
}

export const PrimaryButton = ({title, type="button"}: Omit<ButtonProps, "className">) => {
  return Button({title, className:"btn btn_primary", type});
}

export const LinkButton = ({title, type="button"}: Omit<ButtonProps, "className">) => {
  return Button({title, className:"btn btn_link", type});
}