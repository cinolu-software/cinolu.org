import { Component, signal } from '@angular/core';
import { IPartner, PARTNERS } from '../../landing/data/partners.data';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { Image } from 'primeng/image';
import { HeroCard } from '../../../layout/components/hero-card/hero-card';
import { Handshake, LucideAngularModule } from 'lucide-angular';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-our-parteners',
  imports: [CommonModule, AnimateOnScrollModule, Image, HeroCard, LucideAngularModule, Button],
  templateUrl: './our-parteners.html',
})
export class OurParteners {
  parteners = PARTNERS;
  icons = {
    handshake: Handshake,
  };

  allParteners: IPartner[] = PARTNERS;

  Parteners: IPartner[] = [...this.allParteners];
  lightboxOpen = signal(false);
  currentIndex = signal(0);

  page = signal(1);
  perPage = 12;

  current = signal<IPartner | null>(null);

  filtered = () => this.Parteners.slice(0, this.page() * this.perPage);

  canLoadMore = () => this.filtered().length < this.Parteners.length;

  loadMore() {
    this.page.update((p) => p + 1);
  }

  listCategories() {
    const uniques = Array.from(
      new Set(this.allParteners.map((photo) => photo.category).filter((c): c is string => !!c)),
    );
    return uniques;
  }

  filterByCategory(item: string): void {
    this.Parteners = this.allParteners.filter((photo) => photo.category === item);
    this.page.set(1);
  }

  resetFilter(): void {
    this.Parteners = [...this.allParteners];
    this.page.set(1);
  }
}
