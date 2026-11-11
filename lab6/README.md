# Практична робота №6 — Сторонні сховища (Ionic Storage)

Застосунок з ПР №5 (варіант 1, randomuser.me), де «вибране» зберігається в **Ionic Storage**
(`@ionic/storage-angular`, у браузері — IndexedDB). Після перезавантаження сторінки вибрані користувачі залишаються.

- `app.config.ts` — `IonicStorageModule.forRoot({ name: 'kpop_lab6' })`
- `FavoritesService` — `storage.create()`, читання/запис ключа `favorites`; стан дублюється в signal

```bash
npm install
npm start        # http://localhost:4200
```
