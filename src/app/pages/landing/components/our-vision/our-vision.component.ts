import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObserveVisibilityDirective } from 'app/common/directives/observer.directive';

@Component({
  selector: 'app-our-vision',
  standalone: true,
  imports: [CommonModule, ObserveVisibilityDirective],
  templateUrl: './our-vision.component.html'
})
export class OurVisionComponent {}
