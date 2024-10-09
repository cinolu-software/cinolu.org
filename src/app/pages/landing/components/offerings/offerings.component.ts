import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ObserveVisibilityDirective } from 'app/common/directives/observer.directive';
import { offerings } from './data/offerings';

@Component({
  selector: 'app-our-offerings',
  standalone: true,
  imports: [ObserveVisibilityDirective, MatIconModule],
  templateUrl: './offerings.component.html'
})
export class OfferingsComponent {
  offerings = offerings;
}
