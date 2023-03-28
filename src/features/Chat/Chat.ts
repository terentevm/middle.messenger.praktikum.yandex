import Handlebars from 'handlebars';
import { ChatList } from './ChatList';
import { ChatContent } from './ChatContent';

const template = `
  <div class="chat">
    {{{ ChatList }}}
    {{{ ChatContent }}}
  </div>
`;

const Chat = () => {
  const chatList = ChatList();
  const chatContent = ChatContent();

  const context = {
    ChatList: chatList,
    ChatContent: chatContent,
  };

  return Handlebars.compile(template)(context);
};

export { Chat };
