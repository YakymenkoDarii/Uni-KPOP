import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/user';

/**
 * ПАТЕРН OBSERVER (Спостерігач / Publish–Subscribe).
 *
 * Сховище «вибраного» — це суб'єкт (Subject). Компоненти (таблиця, список
 * вибраного, лічильник у тулбарі) підписуються на favorites$ / count$
 * і автоматично отримують сповіщення про кожну зміну, не знаючи одне про одного.
 */
@Injectable({ providedIn: 'root' })
export class FavoritesStore {
  private readonly subject = new BehaviorSubject<User[]>([]);

  /** Потік зі списком вибраних (на нього підписуються спостерігачі). */
  readonly favorites$: Observable<User[]> = this.subject.asObservable();
  readonly count$: Observable<number> = this.favorites$.pipe(map((list) => list.length));

  /** Поточний знімок стану. */
  get snapshot(): User[] {
    return this.subject.value;
  }

  isFavorite(id: string): boolean {
    return this.snapshot.some((u) => u.id === id);
  }

  add(user: User): void {
    if (!this.isFavorite(user.id)) {
      this.subject.next([...this.snapshot, user]); // сповіщення всіх підписників
    }
  }

  remove(id: string): void {
    this.subject.next(this.snapshot.filter((u) => u.id !== id));
  }

  toggle(user: User): void {
    if (this.isFavorite(user.id)) {
      this.remove(user.id);
    } else {
      this.add(user);
    }
  }

  clear(): void {
    this.subject.next([]);
  }
}
