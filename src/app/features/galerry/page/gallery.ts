import { Component } from '@angular/core';
import { GALLERY_IMAGES } from '../data/gallery.data';
import { HeroGallery } from "../component/hero-gallery/hero-gallery";

@Component({
  selector: 'app-gallery',
  imports: [HeroGallery],
  templateUrl: './gallery.html',
  styles: ``,
})
export class Gallery {
  galleryImages = GALLERY_IMAGES;
}
