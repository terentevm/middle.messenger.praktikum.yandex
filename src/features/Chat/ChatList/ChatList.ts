import Handlebars from 'handlebars';

const template = `
  <aside class="chatList">
  
  </aside >
`;

const ChatList = () => {
  return Handlebars.compile(template)({});
}

export { ChatList };
