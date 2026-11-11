import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { User } from '../../core/models/user';
import { UsersFacade } from '../../core/facade/users.facade';

/** Таблиця користувачів. Уся логіка — у фасаді, компонент лише відображає дані. */
@Component({
  selector: 'app-users-table',
  imports: [
    AsyncPipe,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatTooltipModule,
  ],
  templateUrl: './users-table.html',
  styleUrl: './users-table.css',
})
export class UsersTable implements OnInit, AfterViewInit {
  readonly facade = inject(UsersFacade);

  readonly columns = ['avatar', 'fullName', 'email', 'username', 'password', 'phone', 'favorite'];
  readonly dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    // Observer: таблиця підписана на потік відсортованих користувачів
    this.facade.users$.pipe(takeUntilDestroyed()).subscribe((users) => {
      this.dataSource.data = users;
    });
  }

  ngOnInit(): void {
    this.facade.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.paginator?.firstPage();
  }

  toggleFavorite(user: User, event: Event): void {
    event.stopPropagation();
    this.facade.toggleFavorite(user);
  }
}
