import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ObserveVisibilityDirective } from '@core/directives/observer.directive';
import { Observable } from 'rxjs';
import { QueryObserverResult } from '@ngneat/query';
import { IUser } from '@core/types/models.type';
import { TeamCardSkeletonComponent } from '../../utils/slots/team-card-skeleton/team-card-skeleton.component';
import { TeamCardComponent } from '../../utils/slots/team-card/team-card.component';
import { CoachService } from './coachs.service';
import {
  NguCarousel,
  NguTileComponent,
  NguCarouselDefDirective,
  NguCarouselNextDirective,
  NguCarouselPrevDirective,
  NguCarouselConfig,
  NguItemComponent
} from '@ngu/carousel';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-coachs',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ObserveVisibilityDirective,
    CommonModule,
    TeamCardSkeletonComponent,
    TeamCardComponent,
    NguCarousel,
    NguTileComponent,
    NguCarousel,
    NguCarouselDefDirective,
    NguCarouselNextDirective,
    NguCarouselPrevDirective,
    MatIconModule,
    NguItemComponent
  ],
  templateUrl: './coachs.component.html'
})
export class CoachComponent implements OnInit {
  #coachervice = inject(CoachService);
  staff$: Observable<QueryObserverResult<IUser[], Error>>;
  coachs$: Observable<QueryObserverResult<IUser[], Error>>;
  carouselTile: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 2, lg: 4, all: 0 },
    speed: 250,
    velocity: 0,
    touch: false,
    easing: 'cubic-bezier(0, 0, 0.2, 1)'
  };

  ngOnInit(): void {
    this.coachs$ = this.#coachervice.getCoachs();
  }
}
