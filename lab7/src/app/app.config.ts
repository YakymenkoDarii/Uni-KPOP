import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { IonicStorageModule } from '@ionic/storage-angular';
import { UkPaginatorIntl } from './paginator-intl';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Ionic Storage: окрема база для цього застосунку (IndexedDB → LocalStorage)
    importProvidersFrom(IonicStorageModule.forRoot({ name: 'kpop_lab7', storeName: 'favorites' })),
    { provide: MatPaginatorIntl, useClass: UkPaginatorIntl },
  ],
};
