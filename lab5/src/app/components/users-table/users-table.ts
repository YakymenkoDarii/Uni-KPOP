import { AfterViewInit, Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { User } from '../../models/user';
import { UserApiService } from '../../services/user-api.service';
import { FavoritesService } from '../../services/favorites.service';
import { UserDetailsDialog } from '../user-details-dialog/user-details-dialog';

/** Таблиця користувачів, отриманих з API. */
@Component({
  selector: 'app-users-table',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatTooltipModule,
  ],
  templateUrl: './users-table.html',
  styleUrl: './users-table.css',
})
export class UsersTable implements OnInit, AfterViewInit {
  private readonly api = inject(UserApiService);
  private readonly dialog = inject(MatDialog);
  readonly favorites = inject(FavoritesService);

  readonly columns = ['avatar', 'fullName', 'email', 'username', 'password', 'phone', 'favorite'];
  readonly dataSource = new MatTableDataSource<User>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.load();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async load(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      this.dataSource.data = await this.api.getUsers(50);
    } catch {
      this.error.set('Не вдалося завантажити користувачів. Перевірте з’єднання та спробуйте ще раз.');
    } finally {
      this.loading.set(false);
    }
  }

  applyFilter(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.paginator?.firstPage();
  }

  openDetails(user: User): void {
    this.dialog.open(UserDetailsDialog, { data: user, width: '520px', autoFocus: false });
  }

  toggleFavorite(user: User, event: Event): void {
    // щоб клік по зірочці не відкривав попап рядка
    event.stopPropagation();
    this.favorites.toggle(user);
  }
}
