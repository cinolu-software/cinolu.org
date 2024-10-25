import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { ObserveVisibilityDirective } from 'app/common/directives/observer.directive';

@Component({
  selector: 'app-program-card-skeleton',
  standalone: true,
  imports: [NgOptimizedImage, ObserveVisibilityDirective, CommonModule],
  templateUrl: './program-card-skeleton.component.html'
})
export class ProgramCardSkeletonComponent {}
