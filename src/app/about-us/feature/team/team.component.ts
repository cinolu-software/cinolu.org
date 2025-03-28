import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { combineLatest, Observable } from 'rxjs';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { IUser } from 'app/shared/utils/types/models.type';
import { TeamService } from '../../data-access/team.service';
import { carouselConfig } from '../../utils/config/carousel.config';
import { TeamCardComponent } from '../../ui/team-card/team-card.component';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-team',
  providers: [TeamService],
  imports: [CommonModule, NgIcon, CarouselModule, TeamCardComponent],
  templateUrl: './team.component.html'
})
export class TeamComponent implements OnInit {
  team$: Observable<[IAPIResponse<IUser[]>, IAPIResponse<IUser[]>]>;
  carouselConfig = carouselConfig;
  #teamService = inject(TeamService);

  ngOnInit(): void {
    this.team$ = combineLatest([this.#teamService.getStaffMembers(), this.#teamService.getCoachs()]);
  }
}
