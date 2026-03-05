import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Package,
  MoveRight
} from 'lucide-angular';
import { PublicProductStore } from '../../store/product.store';
import { ProductDetailSkeleton } from '../product-detail-skeleton/product-detail-skeleton';
import { ApiImgPipe } from '../../../../shared/pipes';
import { TranslateModule } from '@ngx-translate/core';
import { IImage } from '../../../../shared/models';

@Component({
  selector: 'app-product-detail',
  providers: [PublicProductStore],
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule,
    ApiImgPipe,
    ProductDetailSkeleton,
    TranslateModule
  ],
  templateUrl: './product-detail.html'
})
export class ProductDetail implements OnInit {
  store = inject(PublicProductStore);
  route = inject(ActivatedRoute);

  lightboxOpen = signal(false);
  lightboxImages = signal<IImage[]>([]);
  lightboxIndex = signal(0);

  icons = {
    eye: Eye,
    x: X,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    package: Package,
    moveRight: MoveRight
  };

  ngOnInit(): void {
    const slug = this.route.snapshot.params['slug'];
    this.store.loadProduct(slug);
  }

  openLightbox(images: IImage[], index: number): void {
    this.lightboxImages.set(images);
    this.lightboxIndex.set(index);
    this.lightboxOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxOpen.set(false);
    document.body.style.overflow = '';
  }

  nextLightboxImage(): void {
    const current = this.lightboxIndex();
    const total = this.lightboxImages().length;
    this.lightboxIndex.set((current + 1) % total);
  }

  previousLightboxImage(): void {
    const current = this.lightboxIndex();
    const total = this.lightboxImages().length;
    this.lightboxIndex.set((current - 1 + total) % total);
  }
}
