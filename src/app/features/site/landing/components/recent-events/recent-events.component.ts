import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { carouselConfig } from '../../config/carousel.config';
import { CarouselModule } from 'primeng/carousel';
import {
  LucideAngularModule,
  MoveUpRight,
  ArrowLeft,
  ArrowRight,
} from 'lucide-angular';
import { EventCardSkeletonComponent } from '../../../events/components/event-card-skeleton/event-card-skeleton.component';
import { EventCardComponent } from '../../../events/components/event-card/event-card.component';
import { RecentEventsStore } from '../../../events/store/recent-events.store';
import { FadeInOnScrollDirective } from '../../../../../shared/directives/animations-on-scroll.directive';

@Component({
  selector: 'app-recent-events',
  providers: [RecentEventsStore],
  imports: [
    CommonModule,
    EventCardComponent,
    CarouselModule,
    RouterModule,
    LucideAngularModule,
    EventCardSkeletonComponent,
    FadeInOnScrollDirective,
  ],
  templateUrl: './recent-events.component.html',
})
export class RecentEventsComponent {
  store = inject(RecentEventsStore);
  carouselOptions = carouselConfig;
  icons = {
    moveUpRight: MoveUpRight,
    moveLeft: ArrowLeft,
    moveRight: ArrowRight,
  };
}
