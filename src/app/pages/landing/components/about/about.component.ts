import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { ObserveVisibilityDirective } from 'app/core/directives/observer.directive';

@Component({
  selector: 'landing-about',
  standalone: true,
  imports: [NgOptimizedImage, ObserveVisibilityDirective],
  templateUrl: './about.component.html'
})
export class AboutComponent {}
