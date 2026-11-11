import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { UsersTable } from './components/users-table/users-table';
import { Favorites } from './components/favorites/favorites';
import { UsersFacade } from './core/facade/users.facade';

@Component({
  selector: 'app-root',
  imports: [
    AsyncPipe,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatCardModule,
    MatChipsModule,
    UsersTable,
    Favorites,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly facade = inject(UsersFacade);
  readonly patterns = ['Singleton', 'Adapter', 'Repository', 'Observer', 'Strategy', 'Facade'];
}
