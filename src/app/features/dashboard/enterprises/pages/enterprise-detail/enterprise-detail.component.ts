import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ArrowLeft, LucideAngularModule, MapPin, MailCheck, PhoneCall } from 'lucide-angular';
import { SelectModule } from 'primeng/select';
import { EnterpriseStore } from '../../store/enterprises/enterprise.store';
import { ApiImgPipe } from '../../../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-enterprise-detail',
  providers: [EnterpriseStore],
  imports: [SelectModule, LucideAngularModule, NgOptimizedImage, CommonModule, ApiImgPipe],
  templateUrl: './enterprise-detail.component.html'
})
export class EnterpriseDetailComponent {
  #location = inject(Location);
  icons = { back: ArrowLeft, locate: MapPin, phone: PhoneCall, email: MailCheck };
  store = inject(EnterpriseStore);

  onGoBack(): void {
    this.#location.back();
  }
}
