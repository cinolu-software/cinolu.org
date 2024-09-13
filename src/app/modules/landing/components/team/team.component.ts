import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { team } from '../../data/team';
import { ObserveVisibilityDirective } from 'app/core/directives/observer.directives';

@Component({
  selector: 'landing-team',
  standalone: true,
  imports: [NgOptimizedImage, ObserveVisibilityDirective],
  templateUrl: './team.component.html'
})
export class TeamComponent {
  team = team;
}
