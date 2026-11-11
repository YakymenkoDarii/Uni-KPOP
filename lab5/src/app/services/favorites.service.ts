import { Injectable, computed, signal } from '@angular/core';
import { User } from '../models/user';

/** Зберігає список «вибраних» користувачів (у пам'яті застосунку). */
@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly _favorites = signal<User[]>([]);

  readonly favorites = this._favorites.asReadonly();
  readonly count = computed(() => this._favorites().length);

  isFavorite(id: string): boolean {
    return this._favorites().some((u) => u.id === id);
  }

  add(user: User): void {
    if (!this.isFavorite(user.id)) {
      this._favorites.update((list) => [...list, user]);
    }
  }

  remove(id: string): void {
    this._favorites.update((list) => list.filter((u) => u.id !== id));
  }

  toggle(user: User): void {
    if (this.isFavorite(user.id)) {
      this.remove(user.id);
    } else {
      this.add(user);
    }
  }

  clear(): void {
    this._favorites.set([]);
  }
}
