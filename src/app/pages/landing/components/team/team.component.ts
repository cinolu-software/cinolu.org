import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { team } from '../../data/team';
import { ObserveVisibilityDirective } from 'app/common/directives/observer.directive';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [NgOptimizedImage, ObserveVisibilityDirective, CommonModule],
  templateUrl: './team.component.html'
})
export class TeamComponent {
  team = team;
}
