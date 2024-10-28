import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ObserveVisibilityDirective } from '@core/directives/observer.directive';
import { services } from './utils/data/services';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [ObserveVisibilityDirective, MatIconModule],
  templateUrl: './services.component.html'
})
export class ServicesComponent {
  services = services;
}
