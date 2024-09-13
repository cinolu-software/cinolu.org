import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { purposes } from '../../data/purpose';
import { ObserveVisibilityDirective } from 'app/core/directives/observer.directives';

@Component({
  selector: 'landing-purposes',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, MatIconModule, ObserveVisibilityDirective],
  templateUrl: './purposes.component.html'
})
export class PurposesComponent {
  purposes = purposes;
}
