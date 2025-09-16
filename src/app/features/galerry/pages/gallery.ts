import { Component } from '@angular/core';
import { GALLERY_IMAGES } from '../data/gallery.data';
import { HeroGallery } from "../component/hero-gallery/hero-gallery";
import { GalleryCard } from "../component/gallery-card/gallery-card";

@Component({
  selector: 'app-gallery',
  imports: [HeroGallery, GalleryCard],
  templateUrl: './gallery.html',
  styles: ``,
})
export class Gallery {
  galleryImages = GALLERY_IMAGES;
}
