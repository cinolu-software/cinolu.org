import { Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { Building2, Globe, Linkedin, LucideAngularModule, Mail, MoveRight, Phone } from 'lucide-angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { carouselConfig } from '../../../landing/config/carousel.config';
import { GalleriaModule } from 'primeng/galleria';
import { Button } from 'primeng/button';
import { VentureCardSkeleton } from '../venture-card-skeleton/venture-card-skeleton';
import { IProduct } from '../../../../shared/models/entities.models';
import { VentureStore } from '@features/entrepreneurs/store/venture.store';

@Component({
  selector: 'app-venture-card-detail',
  providers: [VentureStore],
  imports: [
    LucideAngularModule,
    CommonModule,
    ApiImgPipe,
    NgOptimizedImage,
    GalleriaModule,
    Button,
    RouterLink,
    VentureCardSkeleton
  ],
  templateUrl: './venture-card-detail.html'
})
export class VentureCardDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  store = inject(VentureStore);
  responsiveOptions = carouselConfig;

  icons = {
    moveRight: MoveRight,
    building: Building2,
    phone: Phone,
    linkedin: Linkedin,
    email: Mail,
    globe: Globe
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
