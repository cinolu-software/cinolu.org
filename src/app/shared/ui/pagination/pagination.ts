import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'ui-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  readonly page = input(1);
  readonly pageSize = input(10);
  readonly total = input(0);
  readonly pageChange = output<number>();

  protected readonly totalPages = computed(() => Math.max(1, Math.ceil(this.total() / this.pageSize())));
  protected readonly pages = computed(() => Array.from({ length: this.totalPages() }, (_, index) => index + 1));

  protected setPage(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.page()) return;
    this.pageChange.emit(page);
  }
}
