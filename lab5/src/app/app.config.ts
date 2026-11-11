import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { UkPaginatorIntl } from './paginator-intl';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: MatPaginatorIntl, useClass: UkPaginatorIntl },
  ],
};
