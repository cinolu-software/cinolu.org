import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ObserveVisibilityDirective } from '@core/directives/observer.directive';
import { Observable } from 'rxjs';
import { QueryObserverResult } from '@ngneat/query';
import { IUser } from '@core/types/models.type';
import { StaffService } from './staff.service';
import { TeamCardSkeletonComponent } from '../../utils/slots/team-card-skeleton/team-card-skeleton.component';
import { TeamCardComponent } from '../../utils/slots/team-card/team-card.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ObserveVisibilityDirective,
    CommonModule,
    TeamCardSkeletonComponent,
    TeamCardComponent,
    TeamCardComponent,
    MatIconModule
  ],
  templateUrl: './staff.component.html'
})
export class StaffComponent implements OnInit {
  #staffMembersService = inject(StaffService);
  staff$: Observable<QueryObserverResult<IUser[], Error>>;

  ngOnInit(): void {
    this.staff$ = this.#staffMembersService.getStaffMembers();
  }
}
