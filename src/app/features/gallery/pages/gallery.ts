import { Component, signal, OnInit } from '@angular/core';
import { GALLERY_IMAGES } from '../data/gallery.data';
import { HeroCard } from '../../../layout/components/hero-card/hero-card';
import { Image } from 'lucide-angular';
import { GalleryCardComponent } from '../component/gallery-card/gallery-card';
import { GallerySkeletonComponent } from '../component/gallery-skeleton/gallery-skeleton';

@Component({
  selector: 'app-gallery',
  imports: [HeroCard, GalleryCardComponent, GallerySkeletonComponent],
  templateUrl: './gallery.html'
})
export class Gallery implements OnInit {
  galleryImages = GALLERY_IMAGES;
  loading = signal(true);

  icons = {
    image: Image
  };

  ngOnInit() {
    setTimeout(() => {
      this.loading.set(false);
    }, 1000);
  }
}
