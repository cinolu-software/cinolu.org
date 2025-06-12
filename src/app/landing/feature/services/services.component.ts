import { Component } from '@angular/core';
import { services } from '../../utils/data/services';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-our-services',
  imports: [LucideAngularModule],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  services = services;
}
