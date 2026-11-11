# Практична робота №5 — Робота з сервісами та Angular компонентами

**Варіант 1** — користувачі системи з https://randomuser.me (ім’я, email, логін, пароль, телефон).

- `UserApiService` — запити через **axios**, мапінг відповіді у модель `User`
- `UsersTable` — таблиця **Angular Material** (пошук, пагінація, сортування); клік по рядку відкриває попап
- `UserDetailsDialog` — попап (`MatDialog`) з повною інформацією
- `Favorites` — окремий компонент зі списком «вибраного» (`FavoritesService`, signals)

```bash
npm install
npm start        # http://localhost:4200
```
