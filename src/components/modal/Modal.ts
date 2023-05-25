import Handlebars from 'handlebars';
import { Component } from '../../classes';
import { IModal } from './types';
import { CloseIcon } from '../../icons/CloseIcon';
import { EventType } from '../../classes/component/types';

const template = `
  <div class="{{ className }}" >
    <div class="modal__close">{{{ closeIcon }}}</div>
  {{#if content}}
    {{{ content }}}
  {{/if}}
  </div>
`;

export class Modal extends Component<IModal> {
  constructor({visible= false, className='', content = null, onClose = undefined }: IModal) {
    super({ visible, className: `modal ${className}`, content, onClose });
  }

  protected init() {
    this.children.closeIcon = new CloseIcon({
      color: '#999',
      events: {
        click: (e: Event) => {
          e?.stopPropagation();
          if (typeof this._props.onClose === 'function') {
            this._props.onClose();
          }
        }
      } as EventType
    })
  }

  protected render(): DocumentFragment {
    const visibilityClass = this._props.visible ? 'modal_modal_visible' : 'modal_hidden';
    return this.compile(Handlebars.compile(template), {...this._props, className: `${this._props.className} ${visibilityClass}`});
  }
}
