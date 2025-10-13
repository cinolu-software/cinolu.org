import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ArrowLeft, LucideAngularModule, MapPin, MailCheck, PhoneCall } from 'lucide-angular';
import { SelectModule } from 'primeng/select';
import { VentureStore } from '../../store/ventures/venture.store';
import { ApiImgPipe } from '../../../../../../shared/pipes/api-img.pipe';
import { ActivatedRoute } from '@angular/router';
import { QuillViewComponent } from 'ngx-quill';

@Component({
  selector: 'app-venture-detail',
  providers: [VentureStore],
  imports: [SelectModule, LucideAngularModule, NgOptimizedImage, CommonModule, ApiImgPipe, QuillViewComponent],
  templateUrl: './detail-venture.html',
})
export class DetailVenture implements OnInit {
  icons = {
    back: ArrowLeft,
    locate: MapPin,
    phone: PhoneCall,
    email: MailCheck,
  };
  #route = inject(ActivatedRoute);
  #slug = this.#route.snapshot.params['slug'];
  store = inject(VentureStore);

  ngOnInit(): void {
    this.store.loadVenture(this.#slug);
  }
}
