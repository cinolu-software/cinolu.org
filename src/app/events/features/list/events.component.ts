import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { EventCardComponent } from '../../ui/event-card/event-card.component';
import { EventCardSkeletonComponent } from '../../ui/event-card-skeleton/event-card-skeleton.component';
import { QueryParams } from '../../utils/types/query-params.type';
import { MultiSelectModule, MultiSelectChangeEvent } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { EventsStore } from '../../data-access/events.store';
import { EventCategoriesStore } from '../../data-access/categories.store';

@Component({
  selector: 'app-programs',
  providers: [EventsStore, EventCategoriesStore],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    MultiSelectModule,
    NgOptimizedImage,
    EventCardComponent,
    EventCardSkeletonComponent
  ],
  templateUrl: './events.component.html'
})
export class EventsComponent {
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  skeletonArray = Array(6).fill(0);
  store = inject(EventsStore);
  categoriesStore = inject(EventCategoriesStore);
  queryParams = signal<QueryParams>({
    page: Number(this.#route.snapshot.queryParams?.['page']) || null,
    categories: this.#route.snapshot.queryParams?.['categories'] || null
  });

  onFilterChange(event: MultiSelectChangeEvent, filter: 'page' | 'categories'): void {
    this.queryParams().page = null;
    this.queryParams()[filter] = event.value;
    this.updateRouteAndEvents();
  }

  onClear(): void {
    this.queryParams().page = null;
    this.queryParams().categories = null;
    this.updateRouteAndEvents();
  }

  toogleFinished(): void {
    this.queryParams().page = null;
    this.updateRouteAndEvents();
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage;
    this.updateRouteAndEvents();
  }

  updateRoute(): void {
    const { page, categories } = this.queryParams();
    const queryParams = { page, categories };
    this.#router.navigate(['/events'], { queryParams });
  }

  updateRouteAndEvents(): void {
    this.updateRoute();
    this.store.loadEvents(this.queryParams());
  }
}
