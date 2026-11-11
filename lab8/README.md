# Практична робота №8 — Дизайн патерни

ПР №5 (варіант 1, randomuser.me), переписана з використанням патернів:

| Патерн | Тип | Файл |
|---|---|---|
| Singleton | породжувальний | `src/app/core/http/api-client.ts` |
| Adapter | структурний | `src/app/core/adapters/user.adapter.ts` |
| Repository | архітектурний | `src/app/core/repositories/user.repository.ts` |
| Observer | поведінковий | `src/app/core/store/favorites.store.ts` |
| Strategy | поведінковий | `src/app/core/strategies/sort.strategy.ts` |
| Facade | структурний | `src/app/core/facade/users.facade.ts` |

Презентація: [`presentation/Lab8_Design_Patterns.pptx`](presentation/Lab8_Design_Patterns.pptx) (10 слайдів).

```bash
npm install
npm start        # http://localhost:4200
```
