import axios, { AxiosInstance } from 'axios';

/**
 * ПАТЕРН SINGLETON (Одинак).
 *
 * Єдиний на весь застосунок HTTP-клієнт на базі axios.
 * Конструктор приватний — створити об'єкт можна лише через getInstance(),
 * тому налаштування (baseURL, timeout, interceptors) задаються в одному місці,
 * а всі запити йдуть через один і той самий екземпляр.
 */
export class ApiClient {
  private static instance: ApiClient | null = null;
  private readonly http: AxiosInstance;
  private requestCount = 0;

  private constructor() {
    this.http = axios.create({ baseURL: 'https://randomuser.me/api/', timeout: 10000 });
    this.http.interceptors.request.use((config) => {
      this.requestCount++;
      return config;
    });
  }

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  /** Кількість запитів, виконаних через клієнт (демонстрація спільного стану). */
  get requests(): number {
    return this.requestCount;
  }

  async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const { data } = await this.http.get<T>(url, { params });
    return data;
  }
}
