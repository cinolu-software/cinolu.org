import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SERVICES } from '@features/landing/data/services.data';
import { ServiceCard } from '../service-card/service-card';

@Component({
  selector: 'app-services',
  imports: [ServiceCard],
  templateUrl: './services.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Services {
  services = SERVICES;
}
