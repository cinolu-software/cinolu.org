import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { IService } from '@features/landing/data/services.data';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-service-card',
  imports: [LucideAngularModule],
  templateUrl: './service-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceCard {
  service = input.required<IService>();
}
