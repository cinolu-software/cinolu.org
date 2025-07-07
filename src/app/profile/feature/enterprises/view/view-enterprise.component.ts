import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ArrowLeft, LucideAngularModule, MapPin, MailCheck, PhoneCall } from 'lucide-angular';
import { SelectModule } from 'primeng/select';
import { Enterprisetore } from '../../../data-access/enterprises/enterprise.store';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-view-enterprise',
  providers: [Enterprisetore],
  imports: [SelectModule, LucideAngularModule, NgOptimizedImage, CommonModule, ApiImgPipe],
  templateUrl: './view-enterprise.component.html'
})
export class ViewEnterpriseComponent {
  #location = inject(Location);
  icons = { back: ArrowLeft, locate: MapPin, phone: PhoneCall, email: MailCheck };
  store = inject(Enterprisetore);

  back(): void {
    this.#location.back();
  }
}
