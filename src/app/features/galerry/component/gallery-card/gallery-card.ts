import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GALLERY_IMAGES } from '../../data/gallery.data';
import { ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule, StepBack, StepForward, X } from 'lucide-angular';
import { IGalleryImage } from '../../data/gallery.data';

@Component({
  selector: 'app-gallery-card',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './gallery-card.html',
  styles: ``,
})
export class GalleryCard {
  icons = { prev: StepForward, back: StepBack, close: X };
  photos = GALLERY_IMAGES;
  page = signal(1);
  perPage = 9;

  currentIndex = signal(0);
  lightboxOpen = signal(false);
  current = signal<IGalleryImage | null>(null);

  filtered = () => this.photos.slice(0, this.page() * this.perPage);

  canLoadMore = () => this.filtered().length < this.photos.length;

  loadMore() {
    this.page.update((p) => p + 1);
  }

  openLightbox(p: IGalleryImage) {
    this.currentIndex.set(this.photos.findIndex((x) => x.src === p.src));
    this.current.set(p);
    this.lightboxOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightboxOpen.set(false);
    this.current.set(null);
    document.body.style.overflow = '';
  }

  prev(event?: Event) {
    event?.stopPropagation();
    const idx = this.currentIndex();
    const newIdx = idx <= 0 ? this.photos.length - 1 : idx - 1;
    this.currentIndex.set(newIdx);
    this.current.set(this.photos[newIdx]);
  }

  next(event?: Event) {
    event?.stopPropagation();
    const idx = this.currentIndex();
    const newIdx = idx >= this.photos.length - 1 ? 0 : idx + 1;
    this.currentIndex.set(newIdx);
    this.current.set(this.photos[newIdx]);
  }

  @HostListener('window:keydown', ['$event'])
  handleKey(event: KeyboardEvent) {
    if (!this.lightboxOpen()) return;
    if (event.key === 'ArrowRight') this.next();
    if (event.key === 'ArrowLeft') this.prev();
    if (event.key === 'Escape') this.closeLightbox();
  }
}
