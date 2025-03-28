import { Component } from '@angular/core';
import { services } from '../../utils/data/services.data';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-our-services',
  imports: [NgIcon],
  templateUrl: './services.component.html'
})
export class ServicesComponent {
  services = services;
}
