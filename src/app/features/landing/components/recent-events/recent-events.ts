import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { carouselConfig } from '../../config/carousel.config';
import { CarouselModule } from 'primeng/carousel';
import { LucideAngularModule, MoveUpRight, ArrowLeft, ArrowRight, MoveRight } from 'lucide-angular';
import { EventCardSkeleton } from '../../../events/components/event-card-skeleton/event-card-skeleton';
import { EventCard } from '../../../events/components/event-card/event-card';
import { RecentEventsStore } from '../../../events/store/recent-events.store';
import { FadeInOnScrollDirective } from '../../../../shared/directives/animations-on-scroll.directive';
import { IEvent } from '../../../../shared/models';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-recent-events',
  providers: [RecentEventsStore],
  imports: [
    EventCard,
    CarouselModule,
    RouterModule,
    LucideAngularModule,
    EventCardSkeleton,
    FadeInOnScrollDirective,
    TranslateModule
  ],
  templateUrl: './recent-events.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentEvents {
  store = inject(RecentEventsStore);
  carouselConfig = carouselConfig;
  icons = {
    moveUpRight: MoveUpRight,
    arrowLeft: ArrowLeft,
    arrowRight: ArrowRight,
    moveRight: MoveRight
  };

  constructor() {
    this.store.loadEvents();
  }

  trackByEventId(_index: number, event: IEvent): string {
    return event.id;
  }
}
