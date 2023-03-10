export type ProfileDataElement = {
  label: string;
  value: string | number | null | undefined;
  id: string;
  placeholder?: string | undefined
}
export interface ProfileDataProps {
  data: Array<ProfileDataElement>;
  mode: "edit" | "read"
}

export interface ProfileFormProps {
  name?: string | undefined;
  avatar?: string | undefined;
  data: Array<ProfileDataElement>
}