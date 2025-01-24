import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { services } from '../../utils/data/services';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-our-services',
  imports: [MatIconModule, TranslocoDirective],
  templateUrl: './services.component.html'
})
export class ServicesComponent {
  services = services;
}
