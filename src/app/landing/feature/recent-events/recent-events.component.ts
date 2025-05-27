import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { IEvent } from '../../../shared/utils/types/models.type';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventsService } from '../../../events/data-access/events.service';
import { EventCardComponent } from '../../../events/ui/event-card/event-card.component';
import { carouselConfig } from '../../utils/config/carousel.config';
import { NgIcon } from '@ng-icons/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-recent-events',
  providers: [EventsService],
  imports: [CommonModule, EventCardComponent, CarouselModule, RouterModule, NgIcon],
  templateUrl: './recent-events.component.html',
})
export class RecentEventsComponent implements OnInit {
  events$: Observable<IAPIResponse<IEvent[]>> | undefined;
  #eventsService = inject(EventsService);
  carouselOptions = carouselConfig;

  ngOnInit(): void {
    this.events$ = this.#eventsService.findRecent();
  }
}
