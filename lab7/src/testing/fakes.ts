import { RandomUserDto, User } from '../app/models/user';

/** Створює тестового користувача; будь-яке поле можна перевизначити. */
export function makeUser(overrides: Partial<User> = {}): User {
  return {
    id: 'id-1',
    title: 'Mr',
    firstName: 'Taras',
    lastName: 'Shevchenko',
    fullName: 'Taras Shevchenko',
    gender: 'male',
    email: 'taras@example.com',
    username: 'kobzar',
    password: 'secret',
    phone: '+380 44 000 00 00',
    cell: '+380 67 000 00 00',
    birthDate: '1990-03-09T00:00:00.000Z',
    age: 36,
    registeredAt: '2015-01-01T00:00:00.000Z',
    country: 'Ukraine',
    city: 'Kyiv',
    address: 'Khreshchatyk 1, Kyiv, Kyiv, 01001',
    nationality: 'UA',
    avatar: 'https://randomuser.me/api/portraits/med/men/1.jpg',
    avatarLarge: 'https://randomuser.me/api/portraits/men/1.jpg',
    ...overrides,
  };
}

/** Відповідь API randomuser.me для одного користувача. */
export function makeDto(overrides: Partial<RandomUserDto> = {}): RandomUserDto {
  return {
    gender: 'female',
    name: { title: 'Ms', first: 'Lesya', last: 'Ukrainka' },
    location: {
      street: { number: 25, name: 'Saksahanskoho' },
      city: 'Kyiv',
      state: 'Kyivska',
      country: 'Ukraine',
      postcode: '01033',
    },
    email: 'lesya@example.com',
    login: { uuid: 'uuid-42', username: 'lesya71', password: 'contra' },
    dob: { date: '1971-02-25T00:00:00.000Z', age: 55 },
    registered: { date: '2010-05-05T00:00:00.000Z', age: 16 },
    phone: '(044) 111-2233',
    cell: '(067) 444-5566',
    picture: { large: 'large.jpg', medium: 'medium.jpg', thumbnail: 'thumb.jpg' },
    nat: 'UA',
    ...overrides,
  };
}

/**
 * Проста реалізація Ionic Storage у пам'яті.
 * Має ті самі методи, які використовує FavoritesService: create/get/set.
 */
export class FakeStorage {
  readonly data = new Map<string, unknown>();
  createCalls = 0;
  setCalls = 0;

  constructor(initial: Record<string, unknown> = {}) {
    Object.entries(initial).forEach(([k, v]) => this.data.set(k, v));
  }

  async create(): Promise<FakeStorage> {
    this.createCalls++;
    return this;
  }

  async get(key: string): Promise<unknown> {
    return this.data.has(key) ? this.data.get(key) : null;
  }

  async set(key: string, value: unknown): Promise<unknown> {
    this.setCalls++;
    this.data.set(key, value);
    return value;
  }
}
