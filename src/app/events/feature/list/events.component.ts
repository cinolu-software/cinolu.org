import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { EventCardComponent } from '../../ui/event-card/event-card.component';
import { EventCardSkeletonComponent } from '../../ui/event-card-skeleton/event-card-skeleton.component';
import { QueryParams } from '../../utils/types/query-params.type';
import { ICategory, IEvent } from 'app/shared/utils/types/models.type';
import { Observable } from 'rxjs';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { EventsService } from '../../data-access/events.service';
import { MultiSelectModule, MultiSelectChangeEvent } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-programs',
  providers: [EventsService],
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
export class EventsComponent implements OnInit {
  #eventsService = inject(EventsService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  skeletonArray = Array(6).fill(0);
  events$: Observable<IAPIResponse<[IEvent[], number]>>;
  categories$: Observable<IAPIResponse<ICategory[]>>;
  queryParams = signal<QueryParams>({
    page: Number(this.#route.snapshot.queryParams?.page) || null,
    categories: this.#route.snapshot.queryParams?.categories || null
  });

  ngOnInit(): void {
    this.loadEvents();
    this.categories$ = this.#eventsService.getCategories();
  }

  onFilterChange(event: MultiSelectChangeEvent, filter: string): void {
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

  loadEvents(): void {
    this.events$ = this.#eventsService.getEvents(this.queryParams());
  }

  updateRoute(): void {
    const { page, categories } = this.queryParams();
    const queryParams = { page, categories };
    this.#router.navigate(['/events'], { queryParams });
  }

  updateRouteAndEvents(): void {
    this.updateRoute();
    this.loadEvents();
  }
}
