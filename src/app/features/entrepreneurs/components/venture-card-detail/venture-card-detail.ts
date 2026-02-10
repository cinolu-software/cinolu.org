import { Component, computed, inject, OnInit } from '@angular/core';
import { Building2, Globe, Linkedin, LucideAngularModule, Mail, MoveRight, Phone, TrendingUp } from 'lucide-angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { carouselConfig } from '../../../landing/config/carousel.config';
import { GalleriaModule } from 'primeng/galleria';
import { VentureCardSkeleton } from '../venture-card-skeleton/venture-card-skeleton';
import { PublicVentureStore } from '@features/entrepreneurs/store/venture.store';
import { IProduct } from '../../../../shared/models';
import { ApiImgPipe } from '../../../../shared/pipes';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-venture-card-detail',
  providers: [PublicVentureStore],
  imports: [
    LucideAngularModule,
    CommonModule,
    ApiImgPipe,
    GalleriaModule,
    RouterLink,
    VentureCardSkeleton,
    TranslateModule,
    NgOptimizedImage
  ],
  templateUrl: './venture-card-detail.html'
})
export class VentureCardDetail implements OnInit {
  private route = inject(ActivatedRoute);

  store = inject(PublicVentureStore);
  responsiveOptions = carouselConfig;

  icons = {
    moveRight: MoveRight,
    building: Building2,
    phone: Phone,
    linkedin: Linkedin,
    email: Mail,
    globe: Globe,
    trendingUp: TrendingUp
  };

  products = computed<IProduct[]>(() => {
    const venture = this.store.venture();
    return venture?.products || [];
  });

  hasProducts = computed<boolean>(() => this.products().length > 0);

  ngOnInit(): void {
    const slug = this.route.snapshot.params['slug'];
    this.store.loadVenture(slug);
  }
}
