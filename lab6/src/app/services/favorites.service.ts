import { Injectable, computed, inject, signal } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { User } from '../models/user';

/** Ключ, під яким список вибраних зберігається в Ionic Storage. */
export const FAVORITES_KEY = 'favorites';

/**
 * Зберігає «вибраних» користувачів у сторонньому сховищі Ionic Storage
 * (у браузері це IndexedDB / LocalStorage).
 * Стан дублюється в signal, щоб шаблони оновлювались миттєво.
 */
@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly storage = inject(Storage);
  private readonly _favorites = signal<User[]>([]);
  private readonly _ready = signal(false);
  private store: Storage | null = null;

  /** Проміс ініціалізації сховища та першого читання даних. */
  readonly init: Promise<void> = this.initStorage();

  readonly favorites = this._favorites.asReadonly();
  readonly ready = this._ready.asReadonly();
  readonly count = computed(() => this._favorites().length);

  private async initStorage(): Promise<void> {
    this.store = await this.storage.create();
    const saved = (await this.store.get(FAVORITES_KEY)) as User[] | null;
    this._favorites.set(saved ?? []);
    this._ready.set(true);
  }

  // Усі зміни спершу чекають init, щоб читання зі сховища не перезаписало новий стан.

  isFavorite(id: string): boolean {
    return this._favorites().some((u) => u.id === id);
  }

  async add(user: User): Promise<void> {
    await this.init;
    if (this.isFavorite(user.id)) return;
    this._favorites.update((list) => [...list, user]);
    await this.persist();
  }

  async remove(id: string): Promise<void> {
    await this.init;
    this._favorites.update((list) => list.filter((u) => u.id !== id));
    await this.persist();
  }

  async toggle(user: User): Promise<void> {
    await this.init;
    if (this.isFavorite(user.id)) {
      await this.remove(user.id);
    } else {
      await this.add(user);
    }
  }

  async clear(): Promise<void> {
    await this.init;
    this._favorites.set([]);
    await this.persist();
  }

  /** Записує поточний список у Ionic Storage (викликається лише після init). */
  private async persist(): Promise<void> {
    await this.store!.set(FAVORITES_KEY, this._favorites());
  }
}
