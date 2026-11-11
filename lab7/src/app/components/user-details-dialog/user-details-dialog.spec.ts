import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDetailsDialog } from './user-details-dialog';
import { FavoritesService } from '../../services/favorites.service';
import { makeUser } from '../../../testing/fakes';

describe('UserDetailsDialog', () => {
  let fixture: ComponentFixture<UserDetailsDialog>;
  let favorites: { isFavorite: ReturnType<typeof vi.fn>; toggle: ReturnType<typeof vi.fn> };
  const user = makeUser({ fullName: 'Hryhorii Skovoroda', password: 'philosophy', gender: 'male' });

  beforeEach(async () => {
    // мок FavoritesService через об'єкт зі шпигунами
    favorites = { isFavorite: vi.fn().mockReturnValue(false), toggle: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [UserDetailsDialog],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: user },
        { provide: MatDialogRef, useValue: { close: vi.fn() } },
        { provide: FavoritesService, useValue: favorites },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsDialog);
    fixture.detectChanges();
  });

  const text = (): string => fixture.nativeElement.textContent;

  it('повинен отримати користувача через MAT_DIALOG_DATA', () => {
    expect(fixture.componentInstance.user).toBe(user);
  });

  it('повинен показати повну інформацію: ім’я, email, логін, пароль, телефон', () => {
    expect(text()).toContain('Hryhorii Skovoroda');
    expect(text()).toContain(user.email);
    expect(text()).toContain(user.username);
    expect(text()).toContain('philosophy');
    expect(text()).toContain(user.phone);
  });

  it('повинен відформатувати дату народження як dd.MM.yyyy', () => {
    expect(text()).toMatch(/09\.03\.1990/);
  });

  it('повинен перекласти стать українською', () => {
    expect(text()).toContain('Чоловіча');
  });

  it('кнопка «Додати у вибране» повинна викликати toggle()', () => {
    const buttons: HTMLButtonElement[] = Array.from(fixture.nativeElement.querySelectorAll('button'));
    const addBtn = buttons.find((b) => b.textContent?.includes('Додати у вибране'))!;

    addBtn.click();

    expect(favorites.toggle).toHaveBeenCalledWith(user);
  });

  it('повинен показати «Прибрати з вибраного», якщо користувач уже у вибраному', () => {
    favorites.isFavorite.mockReturnValue(true);
    // новий екземпляр, бо шаблон уже відрендерено
    fixture = TestBed.createComponent(UserDetailsDialog);
    fixture.detectChanges();

    expect(text()).toContain('Прибрати з вибраного');
  });
});
