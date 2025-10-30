import { Component, HostListener, ChangeDetectionStrategy, computed, signal, inject, OnDestroy } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { GALLERY_IMAGES, IGalleryImage } from '../../data/gallery.data';
import { ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule, ReceiptText, StepBack, StepForward, X } from 'lucide-angular';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-gallery-card',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, Button],
  templateUrl: './gallery-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryCardComponent implements OnDestroy {
  private document = inject(DOCUMENT);

  icons = {
    prev: StepForward,
    back: StepBack,
    close: X,
    description: ReceiptText
  } as const;

  private allPhotos: IGalleryImage[] = GALLERY_IMAGES;

  photos = signal<IGalleryImage[]>([...this.allPhotos]);
  activeCategory = signal<string | null>(null);
  page = signal(1);
  perPage = 9;

  currentIndex = signal(0);
  lightboxOpen = signal(false);
  current = signal<IGalleryImage | null>(null);

  filtered = computed(() => this.photos().slice(0, this.page() * this.perPage));
  canLoadMore = computed(() => this.filtered().length < this.photos().length);

  loadMore() {
    this.page.update((p) => p + 1);
  }

  openLightbox(p: IGalleryImage) {
    this.currentIndex.set(this.photos().findIndex((x) => x.src === p.src));
    this.current.set(p);
    this.lightboxOpen.set(true);
    try {
      this.document.body.style.overflow = 'hidden';
    } catch {
      void 0;
    }
  }

  closeLightbox() {
    this.lightboxOpen.set(false);
    this.current.set(null);
    try {
      this.document.body.style.overflow = '';
    } catch {
      void 0;
    }
  }

  prev(event?: Event) {
    event?.stopPropagation();
    const idx = this.currentIndex();
    const newIdx = idx <= 0 ? this.photos().length - 1 : idx - 1;
    this.currentIndex.set(newIdx);
    this.current.set(this.photos()[newIdx]);
  }

  next(event?: Event) {
    event?.stopPropagation();
    const idx = this.currentIndex();
    const newIdx = idx >= this.photos().length - 1 ? 0 : idx + 1;
    this.currentIndex.set(newIdx);
    this.current.set(this.photos()[newIdx]);
  }

  listCategories() {
    return Array.from(new Set(this.allPhotos.map((photo) => photo.category).filter((c): c is string => !!c)));
  }

  filterByCategory(item: string): void {
    this.photos.set(this.allPhotos.filter((photo) => photo.category === item));
    this.page.set(1);
    this.closeLightbox();
    this.activeCategory.set(item);
  }

  resetFilter(): void {
    this.photos.set([...this.allPhotos]);
    this.page.set(1);
    this.activeCategory.set(null);
  }

  isActiveButton(category: string): boolean {
    return this.activeCategory() === category;
  }

  trackBySrc(_: number, item: IGalleryImage) {
    return item.src;
  }

  @HostListener('window:keydown', ['$event'])
  handleKey(event: KeyboardEvent) {
    if (!this.lightboxOpen()) return;
    if (event.key === 'ArrowRight') this.next();
    if (event.key === 'ArrowLeft') this.prev();
    if (event.key === 'Escape') this.closeLightbox();
  }

  ngOnDestroy(): void {
    try {
      if (this.document?.body) this.document.body.style.overflow = '';
    } catch {
      void 0;
    }
  }
}
