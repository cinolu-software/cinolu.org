import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ArrowLeft,
  LucideAngularModule,
  MapPin,
  MailCheck,
  PhoneCall,
} from 'lucide-angular';
import { SelectModule } from 'primeng/select';
import { VentureStore } from '../../store/venture.store';
import { ApiImgPipe } from '../../../../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-venture-detail',
  providers: [VentureStore],
  imports: [
    SelectModule,
    LucideAngularModule,
    NgOptimizedImage,
    CommonModule,
    ApiImgPipe,
  ],
  templateUrl: './detail-venture.html',
})
export class DetailVenture {
  #location = inject(Location);
  icons = {
    back: ArrowLeft,
    locate: MapPin,
    phone: PhoneCall,
    email: MailCheck,
  };
  store = inject(VentureStore);

  onGoBack(): void {
    this.#location.back();
  }
}
