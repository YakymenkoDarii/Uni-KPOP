import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { User } from '../../models/user';
import { FavoritesService } from '../../services/favorites.service';

/** Спливаюче вікно з повною інформацією про користувача. */
@Component({
  selector: 'app-user-details-dialog',
  imports: [DatePipe, MatDialogModule, MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './user-details-dialog.html',
  styleUrl: './user-details-dialog.css',
})
export class UserDetailsDialog {
  readonly user = inject<User>(MAT_DIALOG_DATA);
  readonly favorites = inject(FavoritesService);
}
