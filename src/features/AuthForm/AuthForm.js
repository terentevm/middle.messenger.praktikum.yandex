const template = `
  <form class="authForm">
    <h2 class="authForm__title">{{ title }}</h2>
    {{> @partial-block }}
  </form>
`;

export default template;
