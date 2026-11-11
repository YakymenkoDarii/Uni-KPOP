import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FavoritesService } from '../../services/favorites.service';

/** Окремий компонент для виводу вибраних користувачів. */
@Component({
  selector: 'app-favorites',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {
  readonly favorites = inject(FavoritesService);
}
