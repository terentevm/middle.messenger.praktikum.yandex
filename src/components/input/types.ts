import { ComponentPropType } from '../../classes/component/types';

type inputTypes = 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

export interface InputProps extends ComponentPropType {
  type?: inputTypes;
  id: string;
  label?: string;
  name?: string;
  placeholder?: string | undefined;
  value?: string | number | undefined;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  pattern?: string;
}

export interface InputGroupProps extends InputProps {
  validate?: boolean;
  rule?: string;
  error?: string;
  onErrorMsg?: string;
  hasValue?: boolean;
  inputClassName?: string;
  labelClassName?: string;
  hideLabel?: boolean;
}
