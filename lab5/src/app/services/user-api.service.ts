import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { RandomUserResponse, User, mapRandomUser } from '../models/user';

/** Сервіс для отримання користувачів з https://randomuser.me через axios. */
@Injectable({ providedIn: 'root' })
export class UserApiService {
  private readonly http: AxiosInstance = axios.create({
    baseURL: 'https://randomuser.me/api/',
    timeout: 10000,
  });

  /** Завантажує `count` випадкових користувачів. */
  async getUsers(count = 50): Promise<User[]> {
    const { data } = await this.http.get<RandomUserResponse>('', {
      params: {
        results: count,
        nat: 'ua,us,gb,de,fr,es,ca,au',
        inc: 'gender,name,location,email,login,dob,registered,phone,cell,picture,nat',
      },
    });
    return data.results.map(mapRandomUser);
  }
}
