import { Component, inject, OnInit } from '@angular/core';
import { ProductDetailsStore } from '../../store/product.store';
import { ActivatedRoute } from '@angular/router';
import { carouselConfig } from '../../../landing/config/carousel.config';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { NgOptimizedImage } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-product-detail',
  providers: [ProductDetailsStore],
  imports: [ApiImgPipe, NgOptimizedImage, GalleriaModule],
  templateUrl: './product-detail.html',
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
