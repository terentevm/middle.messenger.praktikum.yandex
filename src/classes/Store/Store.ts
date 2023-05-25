import { EventBus } from '../eventBus';
import { IState } from './types';
import { Component } from '../component';
import { ComponentPropType } from '../component/types';

export enum StoreEvents {
  Updated = 'updated'
}


export class Store extends EventBus {
  private state: any = {};

  public updateState(newState: Partial<IState>) {
    this.state = {...this.state, ...newState};
    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();
// @ts-ignore
window.store = store;

export function withStore<SP>(mapStateToProps: (state: IState) => SP) {
  return function wrap<P extends ComponentPropType>(componentClass: typeof Component<SP & P>){

    return class WithStore extends componentClass {

      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(store.getState());

        // @ts-ignore
        super({ ...(props as P), ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());

          previousState = stateProps;

          // @ts-ignore
          this.setProps({ ...stateProps });
        });

      }
    }
  }
}
export default store;
