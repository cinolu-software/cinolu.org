import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { IEvent } from '../../../shared/utils/types/models.type';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { EventsService } from '../../../events/data-access/events.service';
import { EventCardComponent } from '../../../shared/ui/event-card/event-card.component';
import { EventCardSkeletonComponent } from '../../../shared/ui/event-card-skeleton/event-card-skeleton.component';

@Component({
  selector: 'app-latest-events',
  providers: [EventsService],
  imports: [CommonModule, EventCardComponent, EventCardSkeletonComponent, RouterModule, MatIconModule],
  templateUrl: './latest-events.component.html'
})
export class LatestEventsComponent implements OnInit {
  events$: Observable<IAPIResponse<IEvent[]>>;
  #eventsService = inject(EventsService);

  ngOnInit(): void {
    this.events$ = this.#eventsService.findLatestsEvents();
  }
}
