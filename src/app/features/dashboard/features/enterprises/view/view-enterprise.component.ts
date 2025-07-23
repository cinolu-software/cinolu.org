import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ArrowLeft, LucideAngularModule, MapPin, MailCheck, PhoneCall } from 'lucide-angular';
import { SelectModule } from 'primeng/select';
import { EnterpriseStore } from '../../../data-access/enterprises/enterprise.store';
import { ApiImgPipe } from '../../../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-view-enterprise',
  providers: [EnterpriseStore],
  imports: [SelectModule, LucideAngularModule, NgOptimizedImage, CommonModule, ApiImgPipe],
  templateUrl: './view-enterprise.component.html'
})
export class ViewEnterpriseComponent {
  #location = inject(Location);
  icons = { back: ArrowLeft, locate: MapPin, phone: PhoneCall, email: MailCheck };
  store = inject(EnterpriseStore);

  back(): void {
    this.#location.back();
  }
}
