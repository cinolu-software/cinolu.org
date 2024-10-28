import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { ObserveVisibilityDirective } from '@core/directives/observer.directive';

@Component({
  selector: 'app-team-card-skeleton',
  standalone: true,
  imports: [NgOptimizedImage, ObserveVisibilityDirective, CommonModule],
  templateUrl: './team-card-skeleton.component.html'
})
export class TeamCardSkeletonComponent {}
