import { ProfileDataElement } from '../../features/ProfileCard/types';

const testData : Array<ProfileDataElement> = [
  {
    id: "profile_input_mail",
    name: "email",
    label: "Почта",
    value: "jhon_dhoe@example.com"
  },
  {
    id: "profile_input_login",
    name: "login",
    label: "Логин",
    value: "userman"
  },
  {
    id: "profile_input_name",
    name: "first_name",
    label: "Имя",
    value: "Василий"
  },
  {
    id: "profile_input_surname",
    name: "second_name",
    label: "Фамилия",
    value: "Длиннофамильный"
  },
  {
    id: "profile_input_chatname",
    name: "display_name",
    label: "Имя в чате",
    value: "Вася"
  },
  {
    id: "profile_input_phone",
    name: "phone",
    label: "Телефон",
    value: "+7(895)458-89-66"
  }
];

export { testData };
