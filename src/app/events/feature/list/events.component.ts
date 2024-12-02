import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { EventCardComponent } from '../../ui/event-card/event-card.component';
import { EventCardSkeletonComponent } from '../../ui/event-card-skeleton/event-card-skeleton.component';
import { QueryParams } from '../../utils/types/query-params.type';
import { IEvent, IEventType } from 'app/shared/utils/types/models.type';
import { Observable } from 'rxjs';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { EventsService } from '../../data-access/events.service';

@Component({
  selector: 'app-programs',
  providers: [EventsService],
  imports: [
    CommonModule,
    MatSelectModule,
    MatOptionModule,
    MatSlideToggleModule,
    NgxPaginationModule,
    EventCardComponent,
    EventCardSkeletonComponent
  ],
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit {
  skeletonArray = Array(6).fill(0);
  events$: Observable<IAPIResponse<{ events: IEvent[]; count: number }>>;
  types$: Observable<IAPIResponse<IEventType[]>>;
  #eventsService = inject(EventsService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  queryParams: QueryParams = {
    page: Number(this.#route.snapshot.queryParams?.page) || null,
    type: this.#route.snapshot.queryParams?.type || null,
    eventType: this.#route.snapshot.queryParams?.eventType || null
  };
  eventTypes = [
    { name: 'Physique', value: 'physical' },
    { name: 'En ligne', value: 'online' }
  ];

  ngOnInit(): void {
    this.#loadEvents();
    this.types$ = this.#eventsService.getTypes();
  }

  onFilterChange(event: MatSelectChange, filter: string): void {
    this.queryParams.page = null;
    this.queryParams[filter] = event.value === 'all' ? null : event.value;
    this.#updateRouteAndEvents();
  }

  toogleFinished(): void {
    this.queryParams.page = null;
    this.#updateRouteAndEvents();
  }

  onPageChange(currentPage: number): void {
    this.queryParams.page = currentPage === 1 ? null : currentPage;
    this.#updateRouteAndEvents();
  }

  #loadEvents(): void {
    this.events$ = this.#eventsService.getEvents(this.queryParams);
  }

  #updateRoute(): void {
    const { page, type, eventType } = this.queryParams;
    const queryParams = { page, type, eventType };
    this.#router.navigate(['/events'], { queryParams });
  }

  #updateRouteAndEvents(): void {
    this.#updateRoute();
    this.#loadEvents();
  }
}
