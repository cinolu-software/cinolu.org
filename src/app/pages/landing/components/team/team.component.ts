import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { team } from '../../data/team';
import { ObserveVisibilityDirective } from 'app/common/directives/observer.directive';
import { TeamService } from './team.service';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [NgOptimizedImage, ObserveVisibilityDirective, CommonModule],
  templateUrl: './team.component.html'
})
export class TeamComponent implements OnInit {
  team = team;
  staff;
  coach;
  #teamService = inject(TeamService);

  ngOnInit(): void {
    this.staff = this.#teamService.getTeamMember('staff');
    this.coach = this.#teamService.getTeamMember('coach');
  }
}
