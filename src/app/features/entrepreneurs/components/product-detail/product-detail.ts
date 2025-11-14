import { Component, inject, OnInit } from '@angular/core';
import { ProductDetailsStore } from '../../store/product.store';
import { ActivatedRoute } from '@angular/router';
import { carouselConfig } from '../../../landing/config/carousel.config';
import { GalleriaModule } from 'primeng/galleria';
import { ProductDetailSkeleton } from '../product-detail-skeleton/product-detail-skeleton';
import { ApiImgPipe } from '../../../../shared/pipes';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-detail',
  providers: [ProductDetailsStore],
  imports: [ApiImgPipe, GalleriaModule, ProductDetailSkeleton, TranslateModule],
  templateUrl: './product-detail.html'
})
export class ProductDetail implements OnInit {
  store = inject(ProductDetailsStore);
  route = inject(ActivatedRoute);
  responsiveOptions = carouselConfig;

  ngOnInit(): void {
    const slug = this.route.snapshot.params['slug'];
    this.store.loadProduct(slug);
  }
}
