import Handlebars from 'handlebars';
import { ProfileDataElement, ProfileDataProps } from './types';
import { InlineInput } from '../../components/input';
import { Divider } from '../../components/divider';

const template = `
  <section class="pofileForm__data">
    {{{ Inputs }}}
  </section>
`;

const inputs = (data: Array<ProfileDataElement>, mode: "edit" | "read") => {
  const disabled = mode === "read";
  const divider = Divider();
  return data.map((item:ProfileDataElement) => InlineInput({...item, disabled: disabled})).join(divider);
}

export const ProfileData = ({ data, mode="read" } : ProfileDataProps) => {
  return Handlebars.compile(template)({Inputs: inputs(data, mode)});
}
