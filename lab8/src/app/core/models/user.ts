/** Доменна модель користувача, з якою працює весь застосунок. */
export interface User {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  cell: string;
  birthDate: string;
  age: number;
  registeredAt: string;
  country: string;
  city: string;
  address: string;
  nationality: string;
  avatar: string;
  avatarLarge: string;
}

/** Формат одного запису з https://randomuser.me/api (зовнішній, «чужий» інтерфейс). */
export interface RandomUserDto {
  gender: string;
  name: { title: string; first: string; last: string };
  location: {
    street: { number: number; name: string };
    city: string;
    state: string;
    country: string;
    postcode: string | number;
  };
  email: string;
  login: { uuid: string; username: string; password: string };
  dob: { date: string; age: number };
  registered: { date: string; age: number };
  phone: string;
  cell: string;
  picture: { large: string; medium: string; thumbnail: string };
  nat: string;
}

export interface RandomUserResponse {
  results: RandomUserDto[];
  info: { seed: string; results: number; page: number; version: string };
}
