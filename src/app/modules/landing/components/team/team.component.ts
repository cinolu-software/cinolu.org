import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { team } from '../../data/team';
import { ObserveVisibilityDirective } from 'app/core/directives/observer.directive';

@Component({
  selector: 'landing-team',
  standalone: true,
  imports: [NgOptimizedImage, ObserveVisibilityDirective, CommonModule],
  templateUrl: './team.component.html'
})
export class TeamComponent {
  team = team;
}
