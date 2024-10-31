import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ObserveVisibilityDirective } from '@core/directives/observer.directive';
import { Observable } from 'rxjs';
import { QueryObserverResult } from '@ngneat/query';
import { IUser } from '@core/types/models.type';
import { CoachService } from './coachs.service';
import { MatIconModule } from '@angular/material/icon';
import { TeamCardSkeletonComponent } from '../../utils/slots/team-card-skeleton/team-card-skeleton.component';
import { TeamCardComponent } from '../../utils/slots/team-card/team-card.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

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
    CarouselModule
  ],
  templateUrl: './coachs.component.html'
})
export class CoachComponent implements OnInit {
  #coachervice = inject(CoachService);
  coachs$: Observable<QueryObserverResult<IUser[], Error>>;

  ngOnInit(): void {
    this.coachs$ = this.#coachervice.getCoachs();
  }
}
