import Handlebars from 'handlebars';
import { ContainerWithBackPanel } from '../../features/ContainerWithBackPanel';
import { ChangePasswordForm } from '../../features/ProfileCard';
import { Component } from '../../classes';

export class ChangePasswordPage extends Component{
  protected init() {
    const profileForm = new ChangePasswordForm({});

    this.children.container = new ContainerWithBackPanel({ childrenComponent: profileForm });
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile('{{{ container }}}'), this._props)
  }
};

