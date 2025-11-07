import { Component, input } from '@angular/core';
import { IService } from '@features/landing/data/services.data';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-service-card',
  imports: [LucideAngularModule],
  templateUrl: './service-card.html'
})
export class ServiceCard {
  service = input.required<IService>();
}
