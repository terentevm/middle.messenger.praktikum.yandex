type inputTypes = "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";
export interface InputProps {
  type?: inputTypes;
  id: string;
  label?: string;
  name?: string;
  placeholder?: string;
  value?: string,
  error?: string
}