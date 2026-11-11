import { RandomUserDto, User } from '../models/user';

/**
 * ПАТЕРН ADAPTER (Адаптер).
 *
 * Зовнішнє API повертає дані у своєму форматі (RandomUserDto),
 * а застосунок працює з власною моделлю User. Адаптер перетворює один
 * інтерфейс на інший, тож компоненти нічого не знають про структуру API.
 * Якщо API зміниться — правимо лише адаптер.
 */
export interface Adapter<TSource, TTarget> {
  adapt(source: TSource): TTarget;
}

export class RandomUserAdapter implements Adapter<RandomUserDto, User> {
  adapt(dto: RandomUserDto): User {
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
}
