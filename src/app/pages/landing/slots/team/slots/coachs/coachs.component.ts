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

    MatIconModule
  ],
  templateUrl: './coachs.component.html'
})
export class CoachComponent implements OnInit {
  team = team;
  #coachervice = inject(CoachService);
  coachs$: Observable<QueryObserverResult<IUser[], Error>>;

  ngOnInit(): void {
    this.coachs$ = this.#coachervice.getCoachs();
  }
}
