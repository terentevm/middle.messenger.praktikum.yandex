import Handlebars from 'handlebars';
const template = `
  <div class="{{ classList }}">
    {{{ content }}}
  </div>
`;

interface BadgeProps {
  type: "primary" | "secondary";
  content: string;
  size: "small" | "medium" | "large"
}
const Badge = ({ type = "primary", content="", size = "small"}) => {

  const classArr = [`badge badge_${size}`]
  type === "primary" && classArr.push("badge_primary")

  const classList = classArr.join(" ");

  return Handlebars.compile(template)({classList: classList, content: content})
}

export { Badge };
