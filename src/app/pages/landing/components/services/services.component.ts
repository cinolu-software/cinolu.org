import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { services } from './utils/data/services';

@Component({
    selector: 'app-our-services',
    imports: [MatIconModule],
    templateUrl: './services.component.html'
})
export class ServicesComponent {
  services = services;
}
