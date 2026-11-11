import { TestBed } from '@angular/core/testing';
import { AxiosInstance } from 'axios';
import { UserApiService } from './user-api.service';
import { makeDto } from '../../testing/fakes';

describe('UserApiService', () => {
  let service: UserApiService;
  let getSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserApiService);
    // мокуємо axios-інстанс сервісу — реальних HTTP-запитів немає
    const http = (service as unknown as { http: AxiosInstance }).http;
    getSpy = vi.spyOn(http, 'get');
  });

  afterEach(() => vi.restoreAllMocks());

  it('повинен бути створений як singleton (providedIn: root)', () => {
    expect(service).toBeTruthy();
    expect(TestBed.inject(UserApiService)).toBe(service);
  });

  it('повинен повернути змаплених користувачів', async () => {
    getSpy.mockResolvedValue({ data: { results: [makeDto(), makeDto()], info: {} } });

    const users = await service.getUsers(2);

    expect(users).toHaveLength(2);
    expect(users[0].fullName).toBe('Lesya Ukrainka');
  });

  it('повинен передати кількість користувачів у параметрі results', async () => {
    getSpy.mockResolvedValue({ data: { results: [], info: {} } });

    await service.getUsers(7);

    expect(getSpy).toHaveBeenCalledTimes(1);
    const [, config] = getSpy.mock.calls[0] as [string, { params: Record<string, unknown> }];
    expect(config.params['results']).toBe(7);
    expect(config.params['nat']).toContain('ua');
  });

  it('повинен за замовчуванням запитувати 50 користувачів', async () => {
    getSpy.mockResolvedValue({ data: { results: [], info: {} } });

    await service.getUsers();

    const [, config] = getSpy.mock.calls[0] as [string, { params: Record<string, unknown> }];
    expect(config.params['results']).toBe(50);
  });

  it('повинен прокинути помилку мережі далі', async () => {
    getSpy.mockRejectedValue(new Error('Network Error'));

    await expect(service.getUsers()).rejects.toThrow('Network Error');
  });
});
