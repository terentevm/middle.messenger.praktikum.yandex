import Handlebars from 'handlebars';
import { Component } from '../../classes/component/Component';
import { HeaderProps } from './types';
import { store, withStore } from '../../classes/Store';
import { UserController } from '../../controllers/UserController';
import { User } from '../../types';
import { Avatar } from '../../components/avatar';
import { FileURL } from '../../classes/connector/Connector';
import { EventType } from '../../classes/component/types';
import { StoreEvents } from '../../classes/Store/Store';

const template = `
  <section class="pofileForm__header">
    <div class="pofileForm__avatar">
      {{{ Avatar }}}
    </div>
    
    {{#if withName}}
      <h4 class="pofileForm__name">{{ name }}</h4>
    {{/if}}
    
  </section>
`;

class HeaderBase extends Component<HeaderProps & { user: User}> {
  constructor(props: HeaderProps & { user: User}) {
    super(props);
  }

  protected init() {
    const { user } = this._props;
    this.children.Avatar = new Avatar({
      src: this.getFullFileUrl(user.avatar),
      events: {
        change: this.avatarOnChange.bind(this)
      } as EventType
    });

    store.on(StoreEvents.Updated, () => {
      const user = store.getState().user;
      (this.children.Avatar as Avatar).setProps({
          src: this.getFullFileUrl(user.avatar)
        })
    })
  }

  protected render(): DocumentFragment {
    return this.compile(Handlebars.compile(template), this._props);
  }

  avatarOnChange(e: Event) {
    const files = (e.target as HTMLInputElement).files || [];
    if (files.length > 0) {
      const formData = new FormData();
      formData.append('avatar', files[0]);

      (new UserController()).updateAvatar(formData).catch(()=>alert('Не удалось обновить аватар'));
    }
  }

  getFullFileUrl(urlFromApi: string | null) {
    if (!urlFromApi) return undefined;

    return `${FileURL}${urlFromApi}`;
  }
}

const headerWithProps = withStore<{user: User}>((state) => ({ user: state.user }))
export const Header = headerWithProps<HeaderProps>(HeaderBase);
