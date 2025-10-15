import { Component, effect, inject, model, OnInit, signal } from '@angular/core';
import { Building2, Globe, Linkedin, LucideAngularModule, Mail, MoveRight, Phone } from 'lucide-angular';
import { IImage, IVenture } from '../../../../shared/models/entities.models';
import { ActivatedRoute } from '@angular/router';
import { EntrepreneursStore } from '../../store/entrepreneurs.store';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { carouselConfig } from '../../../landing/config/carousel.config';
import { GalleryVenturesStore } from '../../store/galleries.ventures.store';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-venture-card-detail',
  providers: [EntrepreneursStore, GalleryVenturesStore],
  imports: [LucideAngularModule, CommonModule, ApiImgPipe, NgOptimizedImage, GalleriaModule],
  templateUrl: './venture-card-detail.html',
})
export class VentureCardDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private venturesStore = inject(EntrepreneursStore);
  responsiveOptions = carouselConfig;
  venture = signal<IVenture | null>(null);
  images = model<IImage[]>([]);
  galleryStore = inject(GalleryVenturesStore);

  icons = {
    moveRight: MoveRight,
    building: Building2,
    phone: Phone,
    linkedin: Linkedin,
    email: Mail,
    globe: Globe,
  };

  constructor() {
    const slugParam = this.route.snapshot.paramMap.get('slug');
    const slug = slugParam ? decodeURIComponent(slugParam).toLowerCase() : '';

    this.venturesStore.loadEntrepreneurs();

    effect(() => {
      const list = this.venturesStore.entrepreneurs();

      if (!list || list.length === 0) {
        return;
      }

      for (const e of list) {
        const found = e.ventures?.find((v: IVenture) => v.slug.toLowerCase() === slug);
        if (found) {
          this.venture.set(found);
          break;
        }
      }

      const gallery = this.galleryStore.gallery();
      this.images.set(gallery ?? []);
    });
  }

  // constructor() {
  //   effect(() => {
  //     const gallery = this.galleryStore.gallery();
  //     this.images.set(gallery ?? []);
  //   });
  // }

  ngOnInit(): void {
    const slug = this.route.snapshot.params['slug'];
    this.galleryStore.loadGallery(slug);
  }
}
