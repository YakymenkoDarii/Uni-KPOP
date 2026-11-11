import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UsersFacade } from '../../core/facade/users.facade';

/** Окремий компонент «Вибране» — спостерігач потоку favorites$. */
@Component({
  selector: 'app-favorites',
  imports: [AsyncPipe, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {
  readonly facade = inject(UsersFacade);
}
