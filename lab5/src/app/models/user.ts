/** Користувач системи у форматі, зручному для застосунку. */
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

/** Фрагмент відповіді https://randomuser.me/api (лише поля, які ми використовуємо). */
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

/** Перетворює DTO з API у модель User. */
export function mapRandomUser(dto: RandomUserDto): User {
  const { street, city, state, country, postcode } = dto.location;
  return {
    id: dto.login.uuid,
    title: dto.name.title,
    firstName: dto.name.first,
    lastName: dto.name.last,
    fullName: `${dto.name.first} ${dto.name.last}`,
    gender: dto.gender,
    email: dto.email,
    username: dto.login.username,
    password: dto.login.password,
    phone: dto.phone,
    cell: dto.cell,
    birthDate: dto.dob.date,
    age: dto.dob.age,
    registeredAt: dto.registered.date,
    country,
    city,
    address: `${street.name} ${street.number}, ${city}, ${state}, ${postcode}`,
    nationality: dto.nat,
    avatar: dto.picture.medium,
    avatarLarge: dto.picture.large,
  };
}
