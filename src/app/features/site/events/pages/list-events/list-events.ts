import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { EventCard } from '../../components/event-card/event-card';
import { EventCardSkeleton } from '../../components/event-card-skeleton/event-card-skeleton';
import { FilterEventsDto } from '../../dto/filter-events.dto';
import { MultiSelectModule, MultiSelectChangeEvent } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { EventsStore } from '../../store/events.store';
import { EventCategoriesStore } from '../../store/categories.store';

@Component({
  selector: 'app-events',
  providers: [EventsStore, EventCategoriesStore],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    MultiSelectModule,
    NgOptimizedImage,
    EventCard,
    EventCardSkeleton,
  ],
  templateUrl: './list-events.html',
})
export class ListEvents implements OnInit {
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  skeletonArray = Array(6).fill(0);
  store = inject(EventsStore);
  categoriesStore = inject(EventCategoriesStore);
  queryParams = signal<FilterEventsDto>({
    page: this.#route.snapshot.queryParams?.['page'],
    categories: this.#route.snapshot.queryParams?.['categories'],
  });

  ngOnInit(): void {
    this.store.loadEvents(this.queryParams());
  }

  onFilterChange(
    event: MultiSelectChangeEvent,
    filter: 'page' | 'categories',
  ): void {
    this.queryParams().page = null;
    this.queryParams()[filter] = event.value;
    this.updateRouteAndEvents();
  }

  onClear(): void {
    this.queryParams().page = null;
    this.queryParams().categories = null;
    this.updateRouteAndEvents();
  }


  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
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
