import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Storage } from '@ionic/storage-angular';
import { UsersTable } from './users-table';
import { UserApiService } from '../../services/user-api.service';
import { FavoritesService } from '../../services/favorites.service';
import { UserDetailsDialog } from '../user-details-dialog/user-details-dialog';
import { FakeStorage, makeUser } from '../../../testing/fakes';
import { User } from '../../models/user';

describe('UsersTable', () => {
  let fixture: ComponentFixture<UsersTable>;
  let component: UsersTable;
  let api: { getUsers: ReturnType<typeof vi.fn> };
  let dialog: { open: ReturnType<typeof vi.fn> };
  let favorites: FavoritesService;

  const users: User[] = [
    makeUser({ id: '1', fullName: 'Ivan Franko', email: 'ivan@example.com', username: 'kamenyar' }),
    makeUser({ id: '2', fullName: 'Olena Pchilka', email: 'olena@example.com', username: 'pchilka' }),
    makeUser({ id: '3', fullName: 'Marko Vovchok', email: 'marko@example.com', username: 'vovchok' }),
  ];

  /** Створює компонент з мок-сервісами і чекає завантаження даних. */
  async function create(getUsers: () => Promise<User[]>): Promise<void> {
    api = { getUsers: vi.fn(getUsers) };
    dialog = { open: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [UsersTable],
      providers: [
        { provide: UserApiService, useValue: api },
        { provide: MatDialog, useValue: dialog },
        { provide: Storage, useValue: new FakeStorage() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersTable);
    component = fixture.componentInstance;
    favorites = TestBed.inject(FavoritesService);
    fixture.detectChanges(); // ngOnInit → load()
    await fixture.whenStable();
    fixture.detectChanges();
  }

  const rows = (): HTMLElement[] => Array.from(fixture.nativeElement.querySelectorAll('tr.row'));

  it('повинен створитися', async () => {
    await create(async () => users);
    expect(component).toBeTruthy();
  });

  it('повинен викликати API під час ініціалізації', async () => {
    await create(async () => users);
    expect(api.getUsers).toHaveBeenCalledTimes(1);
    expect(api.getUsers).toHaveBeenCalledWith(50);
  });

  it('повинен відобразити рядок для кожного користувача', async () => {
    await create(async () => users);
    expect(rows()).toHaveLength(3);
    expect(rows()[0].textContent).toContain('Ivan Franko');
    expect(rows()[0].textContent).toContain('kamenyar');
  });

  it('повинен вимкнути індикатор завантаження після отримання даних', async () => {
    await create(async () => users);
    expect(component.loading()).toBe(false);
    expect(fixture.nativeElement.querySelector('mat-progress-bar')).toBeNull();
  });

  it('повинен показати повідомлення про помилку, якщо API впав', async () => {
    await create(async () => {
      throw new Error('500');
    });
    expect(component.error()).not.toBeNull();
    expect(fixture.nativeElement.querySelector('.error').textContent).toMatch(/Не вдалося/);
  });

  it('повинен відкрити попап з даними користувача при кліку на рядок', async () => {
    await create(async () => users);

    rows()[1].click();

    expect(dialog.open).toHaveBeenCalledWith(
      UserDetailsDialog,
      expect.objectContaining({ data: users[1] }),
    );
  });

  it('клік по зірочці повинен додати у вибране і НЕ відкривати попап', async () => {
    await create(async () => users);
    const star = rows()[0].querySelector<HTMLButtonElement>('button.fav-btn')!;

    star.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(favorites.isFavorite('1')).toBe(true);
    expect(dialog.open).not.toHaveBeenCalled();
    expect(star.classList.contains('active')).toBe(true);
  });

  it('повинен фільтрувати таблицю за введеним текстом', async () => {
    await create(async () => users);
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');

    input.value = 'PCHILKA';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.dataSource.filter).toBe('pchilka');
    expect(rows()).toHaveLength(1);
    expect(rows()[0].textContent).toContain('Olena Pchilka');
  });

  it('повинен показати «Нічого не знайдено», якщо фільтр нічого не знайшов', async () => {
    await create(async () => users);
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');

    input.value = 'qwerty';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(rows()).toHaveLength(0);
    expect(fixture.nativeElement.textContent).toContain('Нічого не знайдено');
  });

  it('кнопка «Оновити» повинна повторно завантажити дані', async () => {
    await create(async () => users);
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.toolbar button');

    button.click();
    await fixture.whenStable();

    expect(api.getUsers).toHaveBeenCalledTimes(2);
  });
});
