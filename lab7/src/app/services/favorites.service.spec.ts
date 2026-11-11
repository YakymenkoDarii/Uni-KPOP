import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { FAVORITES_KEY, FavoritesService } from './favorites.service';
import { FakeStorage, makeUser } from '../../testing/fakes';

describe('FavoritesService', () => {
  let storage: FakeStorage;

  /** Створює сервіс з підміненим Ionic Storage і чекає ініціалізації. */
  async function setup(initial: Record<string, unknown> = {}): Promise<FavoritesService> {
    storage = new FakeStorage(initial);
    TestBed.configureTestingModule({ providers: [{ provide: Storage, useValue: storage }] });
    const service = TestBed.inject(FavoritesService);
    await service.init;
    return service;
  }

  it('повинен викликати storage.create() один раз під час ініціалізації', async () => {
    await setup();
    expect(storage.createCalls).toBe(1);
  });

  it('повинен мати порожній список, якщо у сховищі нічого немає', async () => {
    const service = await setup();
    expect(service.favorites()).toEqual([]);
    expect(service.count()).toBe(0);
    expect(service.ready()).toBe(true);
  });

  it('повинен завантажити збережених користувачів зі сховища', async () => {
    const saved = [makeUser({ id: 'a' }), makeUser({ id: 'b' })];
    const service = await setup({ [FAVORITES_KEY]: saved });

    expect(service.favorites()).toEqual(saved);
    expect(service.count()).toBe(2);
  });

  it('повинен додати користувача і зберегти його в Ionic Storage', async () => {
    const service = await setup();
    const user = makeUser();

    await service.add(user);

    expect(service.isFavorite(user.id)).toBe(true);
    expect(storage.data.get(FAVORITES_KEY)).toEqual([user]);
  });

  it('не повинен додавати одного користувача двічі', async () => {
    const service = await setup();
    const user = makeUser();

    await service.add(user);
    await service.add(user);

    expect(service.favorites()).toHaveLength(1);
    expect(storage.setCalls).toBe(1);
  });

  it('повинен видалити користувача і оновити сховище', async () => {
    const service = await setup({ [FAVORITES_KEY]: [makeUser({ id: 'a' }), makeUser({ id: 'b' })] });

    await service.remove('a');

    expect(service.isFavorite('a')).toBe(false);
    expect((storage.data.get(FAVORITES_KEY) as unknown[]).length).toBe(1);
  });

  it('toggle повинен додавати, а повторний toggle — прибирати', async () => {
    const service = await setup();
    const user = makeUser();

    await service.toggle(user);
    expect(service.isFavorite(user.id)).toBeTruthy();

    await service.toggle(user);
    expect(service.isFavorite(user.id)).toBeFalsy();
  });

  it('clear повинен очистити список і сховище', async () => {
    const service = await setup({ [FAVORITES_KEY]: [makeUser()] });

    await service.clear();

    expect(service.count()).toBe(0);
    expect(storage.data.get(FAVORITES_KEY)).toEqual([]);
  });

  it('isFavorite повинен повертати false для невідомого id', async () => {
    const service = await setup({ [FAVORITES_KEY]: [makeUser({ id: 'a' })] });
    expect(service.isFavorite('zzz')).toBe(false);
  });

  it('повинен чекати ініціалізації сховища перед записом', async () => {
    storage = new FakeStorage();
    const setSpy = vi.spyOn(storage, 'set');
    TestBed.configureTestingModule({ providers: [{ provide: Storage, useValue: storage }] });
    const service = TestBed.inject(FavoritesService);

    // init ще не завершено — add все одно має коректно записати
    await service.add(makeUser());

    expect(setSpy).toHaveBeenCalledWith(FAVORITES_KEY, [expect.objectContaining({ id: 'id-1' })]);
  });
});
