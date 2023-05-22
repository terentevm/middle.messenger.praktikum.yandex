import Handlebars from 'handlebars';
import { InputGroupProps } from './types';
import { Component } from '../../classes/component/Component';
import { EventType } from '../../classes/component/types';
import { BaseInput } from './BaseInput';
import { Label } from '../label/Label';

const template = `
  <div
    {{#if className}}
      class="{{ className }}"
    {{/if}} 
  >
    {{{ label }}}
    <div class="input__block">
    {{{ input }}}
    {{#if error}}
      <p class="input__error">{{error}}</p>
    {{/if}}
    </div>
  </div>
`;

class InputGroup extends Component<InputGroupProps> {
  constructor(props: InputGroupProps) {
    super({ ...props, hasValue: false });
  }

  protected init() {
    this.children.label = new Label({
      title: this._props.label || '',
      labelFor: this._props.id,
      className: this._props.labelClassName,
    });

    this.children.input = new BaseInput({
      ...this._props,
      className: this._props.inputClassName,
      events: {
        invalid: () => {
          const errMsg = this._props.onErrorMsg || 'Введены ошибочные данные!';
          this.setProps({ error: errMsg });
        },
        input: (e: Event) => {
          e.stopPropagation();

          const currentValue = (e.target as HTMLInputElement).value;

          if (this.children.label instanceof Label && this._props.hideLabel) {
            currentValue && currentValue !== ''
              ? this.children.label.removeClass('input__label_hidden')
              : this.children.label.addClass('input__label_hidden');
          }
        },

      } as EventType,
    });


    if (this._props.validate === true) {
      const events = this._props.events || {} as EventType;
      events.focusout = (e: Event) => {
        e.stopPropagation();
        this.validate();
      };

      this.setProps({ events });
    }
  }

  protected componentDidUpdate(oldProps?: InputGroupProps, newProps?: InputGroupProps): boolean {

    (this.children.input as BaseInput).setProps({...newProps});

    return true;
  }
  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), { ...this._props });
  }

  validate() : boolean {
    const isValid = (this.children.input as BaseInput).checkValidity();

    if (isValid && this._props.error !== '') {
      this.setProps({ error: '' });
    }

    return isValid;
  }
}
export { InputGroup };
