import Handlebars from 'handlebars';

const template = `
  <main></main>
`;
const ChatContent = () => Handlebars.compile(template)({});

export { ChatContent };
