import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { UkPaginatorIntl } from './paginator-intl';
import { RandomUserRepository, UserRepository } from './core/repositories/user.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: MatPaginatorIntl, useClass: UkPaginatorIntl },
    // Repository: абстракцію UserRepository реалізує RandomUserRepository
    { provide: UserRepository, useClass: RandomUserRepository },
  ],
};
