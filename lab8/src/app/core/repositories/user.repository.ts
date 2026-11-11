import { Injectable } from '@angular/core';
import { ApiClient } from '../http/api-client';
import { RandomUserAdapter } from '../adapters/user.adapter';
import { RandomUserResponse, User } from '../models/user';

/**
 * ПАТЕРН REPOSITORY (Репозиторій).
 *
 * Абстракція джерела даних: решта застосунку просить «дай користувачів»
 * і не знає, звідки вони беруться (REST API, кеш, моки в тестах).
 * Абстрактний клас одночасно є DI-токеном Angular.
 */
export abstract class UserRepository {
  abstract getUsers(count: number): Promise<User[]>;
}

/** Реалізація репозиторію поверх randomuser.me: Singleton-клієнт + Adapter. */
@Injectable()
export class RandomUserRepository extends UserRepository {
  private readonly client = ApiClient.getInstance();
  private readonly adapter = new RandomUserAdapter();

  async getUsers(count: number): Promise<User[]> {
    const response = await this.client.get<RandomUserResponse>('', {
      results: count,
      nat: 'ua,us,gb,de,fr,es,ca,au',
      inc: 'gender,name,location,email,login,dob,registered,phone,cell,picture,nat',
    });
    return response.results.map((dto) => this.adapter.adapt(dto));
  }
}
