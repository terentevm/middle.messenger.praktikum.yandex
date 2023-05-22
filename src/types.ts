export interface SigninData {
  login: string;
  password: string;
}

export interface SignupData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
  display_name? : string;
}

export interface Message {
  user: User;
  time: string;
  content: string;
}

export interface Chat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: Message;
}

export interface MessageInfo {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
  is_read?: boolean;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  }
}
