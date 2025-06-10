import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { IEvent } from '../../../shared/utils/types/models.type';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventsService } from '../../../events/data-access/events.service';
import { EventCardComponent } from '../../../events/ui/event-card/event-card.component';
import { carouselConfig } from '../../utils/config/carousel.config';
import { CarouselModule } from 'primeng/carousel';
import { LucideAngularModule, MoveUpRight, ArrowLeft, ArrowRight } from 'lucide-angular';

@Component({
  selector: 'app-recent-events',
  providers: [EventsService],
  imports: [CommonModule, EventCardComponent, CarouselModule, RouterModule, LucideAngularModule],
  templateUrl: './recent-events.component.html',
})
export class RecentEventsComponent implements OnInit {
  events$: Observable<IAPIResponse<IEvent[]>> | undefined;
  #eventsService = inject(EventsService);
  carouselOptions = carouselConfig;
  icons = {
    moveUpRight: MoveUpRight,
    moveLeft: ArrowLeft,
    moveRight: ArrowRight,
  };

  ngOnInit(): void {
    this.events$ = this.#eventsService.findRecent();
  }
}
