import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ObserveVisibilityDirective } from '@core/directives/observer.directive';
import { Observable } from 'rxjs';
import { QueryObserverResult } from '@ngneat/query';
import { IUser } from '@core/types/models.type';
import { TeamCardSkeletonComponent } from '../../utils/slots/team-card-skeleton/team-card-skeleton.component';
import { TeamCardComponent } from '../../utils/slots/team-card/team-card.component';
import { CoachService } from './coachs.service';
import { MatIconModule } from '@angular/material/icon';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { team } from '../../../../../auth/slots/auth-card/team';

@Component({
  selector: 'app-coachs',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ObserveVisibilityDirective,
    CommonModule,
    TeamCardSkeletonComponent,
    TeamCardComponent,
    MatIconModule,
    SlickCarouselModule
  ],
  templateUrl: './coachs.component.html'
})
export class CoachComponent implements OnInit {
  slides = team;
  slideConfig = { slidesToShow: 3, slidesToScroll: 1 };
  #coachervice = inject(CoachService);
  coachs$: Observable<QueryObserverResult<IUser[], Error>>;

  ngOnInit(): void {
    this.coachs$ = this.#coachervice.getCoachs();
  }
}
