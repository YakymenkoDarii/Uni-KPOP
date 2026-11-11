import { User } from '../models/user';

/**
 * ПАТЕРН STRATEGY (Стратегія).
 *
 * Сімейство взаємозамінних алгоритмів сортування з однаковим інтерфейсом.
 * Фасад тримає посилання на поточну стратегію і просто викликає sort(),
 * а користувач змінює стратегію в інтерфейсі — без жодних if/switch.
 */
export interface SortStrategy {
  readonly id: string;
  readonly label: string;
  sort(users: readonly User[]): User[];
}

export class NoSortStrategy implements SortStrategy {
  readonly id = 'none';
  readonly label = 'Як прийшло з API';
  sort(users: readonly User[]): User[] {
    return [...users];
  }
}

export class ByNameStrategy implements SortStrategy {
  readonly id = 'name';
  readonly label = 'За ім’ям (А→Я)';
  sort(users: readonly User[]): User[] {
    return [...users].sort((a, b) => a.fullName.localeCompare(b.fullName));
  }
}

export class ByUsernameStrategy implements SortStrategy {
  readonly id = 'username';
  readonly label = 'За логіном';
  sort(users: readonly User[]): User[] {
    return [...users].sort((a, b) => a.username.localeCompare(b.username));
  }
}

export class ByAgeStrategy implements SortStrategy {
  readonly id = 'age';
  readonly label = 'За віком (молодші першими)';
  sort(users: readonly User[]): User[] {
    return [...users].sort((a, b) => a.age - b.age);
  }
}

export class ByPasswordStrengthStrategy implements SortStrategy {
  readonly id = 'password';
  readonly label = 'За довжиною пароля (довші першими)';
  sort(users: readonly User[]): User[] {
    return [...users].sort((a, b) => b.password.length - a.password.length);
  }
}

/** Усі доступні стратегії — для випадаючого списку. */
export const SORT_STRATEGIES: readonly SortStrategy[] = [
  new NoSortStrategy(),
  new ByNameStrategy(),
  new ByUsernameStrategy(),
  new ByAgeStrategy(),
  new ByPasswordStrengthStrategy(),
];
