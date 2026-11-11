import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { UsersTable } from './components/users-table/users-table';
import { Favorites } from './components/favorites/favorites';
import { FavoritesService } from './services/favorites.service';

@Component({
  selector: 'app-root',
  imports: [MatToolbarModule, MatIconModule, MatBadgeModule, MatCardModule, UsersTable, Favorites],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly favorites = inject(FavoritesService);
}
