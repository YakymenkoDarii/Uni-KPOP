import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { User } from '../models/user';
import { UserRepository } from '../repositories/user.repository';
import { FavoritesStore } from '../store/favorites.store';
import { SORT_STRATEGIES, SortStrategy } from '../strategies/sort.strategy';
import { UserDetailsDialog } from '../../components/user-details-dialog/user-details-dialog';

/**
 * ПАТЕРН FACADE (Фасад).
 *
 * Один простий інтерфейс до складної підсистеми: репозиторій (API + адаптер),
 * сховище вибраного (Observer), стратегії сортування (Strategy) і діалоги Material.
 * Компоненти працюють лише з фасадом, тож вони тонкі й легко тестуються.
 */
@Injectable({ providedIn: 'root' })
export class UsersFacade {
  private readonly repository = inject(UserRepository);
  private readonly favoritesStore = inject(FavoritesStore);
  private readonly dialog = inject(MatDialog);

  private readonly rawUsers$ = new BehaviorSubject<User[]>([]);
  private readonly strategy$ = new BehaviorSubject<SortStrategy>(SORT_STRATEGIES[0]);
  private readonly loading$$ = new BehaviorSubject<boolean>(false);
  private readonly error$$ = new BehaviorSubject<string | null>(null);

  readonly strategies = SORT_STRATEGIES;

  /** Користувачі, відсортовані поточною стратегією. */
  readonly users$: Observable<User[]> = combineLatest([this.rawUsers$, this.strategy$]).pipe(
    map(([users, strategy]) => strategy.sort(users)),
  );
  readonly loading$ = this.loading$$.asObservable();
  readonly error$ = this.error$$.asObservable();
  readonly activeStrategy$ = this.strategy$.asObservable();
  readonly favorites$ = this.favoritesStore.favorites$;
  readonly favoritesCount$ = this.favoritesStore.count$;

  async loadUsers(count = 50): Promise<void> {
    this.loading$$.next(true);
    this.error$$.next(null);
    try {
      this.rawUsers$.next(await this.repository.getUsers(count));
    } catch {
      this.error$$.next('Не вдалося завантажити користувачів. Перевірте з’єднання та спробуйте ще раз.');
    } finally {
      this.loading$$.next(false);
    }
  }

  setSortStrategy(id: string): void {
    const strategy = this.strategies.find((s) => s.id === id);
    if (strategy) this.strategy$.next(strategy);
  }

  openDetails(user: User): void {
    this.dialog.open(UserDetailsDialog, { data: user, width: '520px', autoFocus: false });
  }

  isFavorite(id: string): boolean {
    return this.favoritesStore.isFavorite(id);
  }

  toggleFavorite(user: User): void {
    this.favoritesStore.toggle(user);
  }

  removeFavorite(id: string): void {
    this.favoritesStore.remove(id);
  }

  clearFavorites(): void {
    this.favoritesStore.clear();
  }
}
