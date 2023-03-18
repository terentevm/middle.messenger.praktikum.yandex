import Handlebars from 'handlebars';

const template: string = `
  <main></main>
`;
const ChatContent = () => {
  return Handlebars.compile(template)({})
}

export { ChatContent };
