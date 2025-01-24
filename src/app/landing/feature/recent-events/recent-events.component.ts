import { afterNextRender, Component, inject, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { IEvent } from '../../../shared/utils/types/models.type';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { EventsService } from '../../../events/data-access/events.service';
import { EventCardComponent } from '../../../shared/ui/event-card/event-card.component';
import { EventCardSkeletonComponent } from '../../../shared/ui/event-card-skeleton/event-card-skeleton.component';
import { owlOptionsRecent } from '../../utils/config/owl.config';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-recent-events',
  providers: [EventsService],
  imports: [
    CommonModule,
    EventCardComponent,
    CarouselModule,
    EventCardSkeletonComponent,
    RouterModule,
    MatIconModule,
    TranslocoDirective
  ],
  templateUrl: './recent-events.component.html'
})
export class RecentEventsComponent implements OnInit {
  events$: Observable<IAPIResponse<IEvent[]>>;
  #eventsService = inject(EventsService);
  isBrowser = signal<boolean>(false);
  owlOptions = owlOptionsRecent;

  constructor() {
    afterNextRender(() => this.isBrowser.set(true));
  }

  ngOnInit(): void {
    this.events$ = this.#eventsService.findRecent();
  }
}
