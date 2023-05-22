import { InputGroup } from './InputGroup';
import { InputGroupProps } from './types';

const LoginInput = (props: InputGroupProps) : InputGroup => new InputGroup({
  ...props,
  className: '',
  labelClassName: 'input__label input__label_hidden',
  inputClassName: 'input',
  hideLabel: true,
});

const ProfileInput = (props: InputGroupProps) : InputGroup => new InputGroup({
  ...props,
  className: 'inputInline',
  labelClassName: 'inputInline__label',
  inputClassName: 'inputInline__input',

});

export { LoginInput, ProfileInput };
