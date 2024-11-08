import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ObservableQueryResult } from '@ngneat/query';
import { EventsService } from './events.service';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { EventCardSkeletonComponent } from '../../components/event-card-skeleton/event-card-skeleton.component';
import { QueryParams } from '../../types/query-params.type';
import { IEvent, IEventType } from '../../../../common/types/models.type';

const SKELETON_ITEM_COUNT = 9;

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatSlideToggleModule,
    RouterLink,
    NgxPaginationModule,
    EventCardComponent,
    EventCardSkeletonComponent
  ],
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit {
  skeletonArray = Array(SKELETON_ITEM_COUNT).fill(0);
  events$: ObservableQueryResult<{ events: IEvent[]; count: number }, Error>;
  types$: ObservableQueryResult<IEventType[], Error>;
  #eventsService = inject(EventsService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  queryParams: QueryParams = {
    page: Number(this.#route.snapshot.queryParams?.page) || null,
    type: this.#route.snapshot.queryParams?.type || null
  };

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
    const { page, type } = this.queryParams;
    const queryParams = { page, type };
    this.#router.navigate(['/events'], { queryParams });
  }

  #updateRouteAndEvents(): void {
    this.#updateRoute();
    this.#loadEvents();
  }
}
