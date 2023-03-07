import Handlebars from 'handlebars';

const template: string = `
  <content></content>
`;
const ChatContent = () => {
  return Handlebars.compile(template)({})
}

export { ChatContent };
