import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { ObserveVisibilityDirective } from '@core/directives/observer.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgOptimizedImage, ObserveVisibilityDirective],
  templateUrl: './about.component.html'
})
export class AboutComponent {}
