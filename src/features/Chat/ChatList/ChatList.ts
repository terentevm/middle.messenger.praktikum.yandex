import Handlebars from 'handlebars';

const template = `
  <aside class="chatList">
  
  </aside >
`;

const ChatList = () => Handlebars.compile(template)({});

export { ChatList };
