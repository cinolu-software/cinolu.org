import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObserveVisibilityDirective } from 'app/core/directives/observer.directives';

@Component({
  selector: 'our-vision',
  standalone: true,
  imports: [CommonModule, ObserveVisibilityDirective],
  templateUrl: './our-vision.component.html'
})
export class OurVisionComponent {}
