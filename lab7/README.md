# Практична робота №7 — Тестування Angular компонент

Тести для застосунку з ПР №6. Раннер — **Vitest** (вбудований у Angular 21 builder `@angular/build:unit-test`, jsdom).

| Файл | Що перевіряється |
|---|---|
| `models/user.spec.ts` | мапінг DTO → User |
| `services/user-api.service.spec.ts` | axios замоканий через `vi.spyOn`, параметри запиту, помилки |
| `services/favorites.service.spec.ts` | Ionic Storage підмінено `FakeStorage`, асинхронна ініціалізація, запис/видалення |
| `components/users-table/users-table.spec.ts` | рендер рядків, попап по кліку, зірочка, фільтр, помилка API |
| `components/user-details-dialog/*.spec.ts` | `MAT_DIALOG_DATA`, мок FavoritesService |
| `components/favorites/favorites.spec.ts` | список, видалення, очищення |
| `paginator-intl.spec.ts`, `app.spec.ts` | локалізація пагінатора, кореневий компонент |

**48 тестів**, покриття ~99 % (поріг 75 % задано в `angular.json` → `coverageThresholds`).

```bash
npm install
npm run test:ci        # одноразовий запуск
npm run test:coverage  # з покриттям (HTML-звіт у coverage/)
```
