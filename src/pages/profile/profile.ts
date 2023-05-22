import Handlebars from 'handlebars';
import { ContainerWithBackPanel } from '../../features/ContainerWithBackPanel';
import { ProfileForm } from '../../features/ProfileCard';
import { Component } from '../../classes';

export class ProfilePage extends Component {
  constructor(props: any) {
    super(props);
  }
  protected init() {

    const profileForm = new ProfileForm({
      user: this._props.user,
      mode: 'read',
    });
    this.children.container = new ContainerWithBackPanel({ childrenComponent: profileForm })
  }

  protected render(): DocumentFragment {
    console.log('profile render');
    return this.compile(Handlebars.compile('{{{ container }}}'), this._props);
  }
}
