import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { carouselConfig } from '../../config/carousel.config';
import { CarouselModule } from 'primeng/carousel';
import { LucideAngularModule, MoveUpRight, ArrowLeft, ArrowRight } from 'lucide-angular';
import { EventCardSkeleton } from '../../../events/components/event-card-skeleton/event-card-skeleton';
import { EventCard } from '../../../events/components/event-card/event-card';
import { RecentEventsStore } from '../../../events/store/recent-events.store';
import { FadeInOnScrollDirective } from '../../../../common/directives/animations-on-scroll.directive';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-recent-events',
  providers: [RecentEventsStore],
  imports: [
    CommonModule,
    EventCard,
    CarouselModule,
    RouterModule,
    LucideAngularModule,
    EventCardSkeleton,
    FadeInOnScrollDirective,
    Button,
  ],
  templateUrl: './recent-events.html',
})
export class RecentEvents {
  store = inject(RecentEventsStore);
  carouselOptions = carouselConfig;
  icons = {
    moveUpRight: MoveUpRight,
    moveLeft: ArrowLeft,
    moveRight: ArrowRight,
  };
}
