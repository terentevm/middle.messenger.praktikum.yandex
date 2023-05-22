export const rules : {[key: string]: string} = {
  login: '^(?!^\\d+$)[a-zA-Z0-9_-]{3,20}$',
  password: '^(?=.*\\d)(?=.*[A-Z]).{8,40}$',
  firstName: '^[A-ZА-Я][a-zа-я\\-A-Z]*$',
  secondName: '^[A-ZА-Я][a-zа-я\\-A-Z]*$',
  email: '^[a-zA-Z0-9-]+@[a-zA-Z]+\\.([a-zA-Z]+\\.?)+$',
  phone: '^\\+?\\d{10,15}$',
} as const;
