import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObserveVisibilityDirective } from 'app/common/directives/observer.directive';

@Component({
  selector: 'app-vision',
  standalone: true,
  imports: [CommonModule, ObserveVisibilityDirective],
  templateUrl: './vision.component.html'
})
export class VisionComponent {}
