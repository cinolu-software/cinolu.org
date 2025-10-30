import { Component } from '@angular/core';
import { SERVICES } from '../../data/services.data';
import { LucideAngularModule } from 'lucide-angular';
import { FadeInOnScrollDirective } from '../../../../common/directives/animations-on-scroll.directive';

@Component({
  selector: 'app-our-services',
  imports: [LucideAngularModule, FadeInOnScrollDirective],
  templateUrl: './services.html',
})
export class Services {
  services = SERVICES;
}
