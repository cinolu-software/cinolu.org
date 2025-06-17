import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventCardComponent } from '../../../events/ui/event-card/event-card.component';
import { carouselConfig } from '../../utils/config/carousel.config';
import { CarouselModule } from 'primeng/carousel';
import { LucideAngularModule, MoveUpRight, ArrowLeft, ArrowRight } from 'lucide-angular';
import { RecentEventsStore } from '../../data-access/recent-events.store';
import { EventCardSkeletonComponent } from '../../../events/ui/event-card-skeleton/event-card-skeleton.component';

@Component({
  selector: 'app-recent-events',
  providers: [RecentEventsStore],
  imports: [
    CommonModule,
    EventCardComponent,
    CarouselModule,
    RouterModule,
    LucideAngularModule,
    EventCardSkeletonComponent
  ],
  templateUrl: './recent-events.component.html'
})
export class RecentEventsComponent {
  store = inject(RecentEventsStore);
  carouselOptions = carouselConfig;
  icons = {
    moveUpRight: MoveUpRight,
    moveLeft: ArrowLeft,
    moveRight: ArrowRight
  };
}
