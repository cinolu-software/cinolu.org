import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObserveVisibilityDirective } from 'app/core/directives/observer.directives';

@Component({
  selector: 'our-aim',
  standalone: true,
  imports: [CommonModule, ObserveVisibilityDirective],
  templateUrl: './our-aim.component.html'
})
export class OurAimComponent {}
