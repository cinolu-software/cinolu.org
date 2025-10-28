import { Component } from '@angular/core';
import { GALLERY_IMAGES } from '../data/gallery.data';
import { GalleryCard } from '../component/gallery-card/gallery-card';
import { HeroCard } from '../../../layout/components/hero-card/hero-card';
import { Image } from 'lucide-angular';

@Component({
  selector: 'app-gallery',
  imports: [GalleryCard, HeroCard],
  templateUrl: './gallery.html',
})
export class Gallery {
  galleryImages = GALLERY_IMAGES;
  icons = {
    image: Image,
  };
}
