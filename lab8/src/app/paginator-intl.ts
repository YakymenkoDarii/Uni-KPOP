import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

/** Українські підписи для mat-paginator. */
@Injectable()
export class UkPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Рядків на сторінці:';
  override nextPageLabel = 'Наступна сторінка';
  override previousPageLabel = 'Попередня сторінка';
  override firstPageLabel = 'Перша сторінка';
  override lastPageLabel = 'Остання сторінка';

  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0) return `0 з ${length}`;
    const start = page * pageSize;
    const end = Math.min(start + pageSize, length);
    return `${start + 1} – ${end} з ${length}`;
  };
}
