import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { Favorites } from './favorites';
import { FAVORITES_KEY, FavoritesService } from '../../services/favorites.service';
import { FakeStorage, makeUser } from '../../../testing/fakes';

describe('Favorites', () => {
  let fixture: ComponentFixture<Favorites>;
  let service: FavoritesService;
  let storage: FakeStorage;

  async function create(saved: unknown[] = []): Promise<void> {
    storage = new FakeStorage({ [FAVORITES_KEY]: saved });
    await TestBed.configureTestingModule({
      imports: [Favorites],
      providers: [{ provide: Storage, useValue: storage }],
    }).compileComponents();

    fixture = TestBed.createComponent(Favorites);
    service = TestBed.inject(FavoritesService);
    await service.init;
    fixture.detectChanges();
  }

  const items = (): HTMLElement[] => Array.from(fixture.nativeElement.querySelectorAll('.fav'));

  it('повинен показати підказку, якщо вибраних немає', async () => {
    await create();
    expect(items()).toHaveLength(0);
    expect(fixture.nativeElement.querySelector('.empty').textContent).toContain('Натисніть');
  });

  it('повинен відобразити збережених у сховищі користувачів', async () => {
    await create([makeUser({ id: 'a', fullName: 'User A' }), makeUser({ id: 'b', fullName: 'User B' })]);

    expect(items()).toHaveLength(2);
    expect(items()[1].textContent).toContain('User B');
    expect(fixture.nativeElement.textContent).toContain('2 користувач');
  });

  it('кнопка ✕ повинна прибрати користувача', async () => {
    await create([makeUser({ id: 'a' }), makeUser({ id: 'b' })]);

    items()[0].querySelector('button')!.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(items()).toHaveLength(1);
    expect(service.isFavorite('a')).toBe(false);
  });

  it('кнопка «Очистити» повинна очистити список і сховище', async () => {
    await create([makeUser({ id: 'a' })]);
    const clearSpy = vi.spyOn(service, 'clear');
    const clearBtn: HTMLButtonElement = fixture.nativeElement.querySelector('mat-card-actions button');

    clearBtn.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(clearSpy).toHaveBeenCalled();
    expect(items()).toHaveLength(0);
    expect(storage.data.get(FAVORITES_KEY)).toEqual([]);
  });

  it('не повинен показувати «Очистити», коли список порожній', async () => {
    await create();
    expect(fixture.nativeElement.querySelector('mat-card-actions')).toBeNull();
  });
});
