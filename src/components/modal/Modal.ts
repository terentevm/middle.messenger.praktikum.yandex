import Handlebars from 'handlebars';
import { Component } from '../../classes';
import { IModal } from './types';
//import { withStore, store} from '../../classes/Store';
//import { StoreEvents } from '../../classes/Store/Store';

const template = `
  <div class="{{ className }}" >
  {{#if content}}
    {{{ content }}}
  {{/if}}
  </div>
`;

export class Modal extends Component<IModal> {
  constructor({visible= false, className='', content = null }: IModal) {
    super({ visible, className: `modal ${className}`, content});
  }

  // protected init() {
  //
  //   store.on(StoreEvents.Updated, () => {
  //     const modalIsVisible = store.getState().modalIsVisible;
  //     this.setProps({
  //       modalIsVisible: modalIsVisible
  //     });
  //
  //     if (modalIsVisible) {
  //       this.show();
  //     } else {
  //       this.hide();
  //     }
  //   })
  //
  // }

  protected render(): DocumentFragment {
    const visibilityClass = this._props.visible ? 'modal_modal_visible' : 'modal_hidden';
    return this.compile(Handlebars.compile(template), {...this._props, className: `${this._props.className} ${visibilityClass}`});
  }
}
//
// const componentWithState = withStore<{modalIsVisible: boolean}>((state) => ({modalIsVisible: state.modalIsVisible}));
//
// export const Modal = componentWithState<IModal>(ModalBase)
