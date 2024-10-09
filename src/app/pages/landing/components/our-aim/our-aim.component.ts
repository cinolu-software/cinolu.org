import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObserveVisibilityDirective } from 'app/common/directives/observer.directive';

@Component({
  selector: 'app-our-aim',
  standalone: true,
  imports: [CommonModule, ObserveVisibilityDirective],
  templateUrl: './our-aim.component.html'
})
export class OurAimComponent {}
