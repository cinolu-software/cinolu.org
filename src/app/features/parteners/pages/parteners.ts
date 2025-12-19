import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { IPartner, PARTNERS } from '../../landing/data/partners.data';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { HeroCard } from '../../../layout/components/hero-card/hero-card';
import { ArrowRight, Handshake, LucideAngularModule } from 'lucide-angular';
import { PartenersSkeleton } from '../component/parteners-skeleton/parteners-skeleton';
import { PartenersCard } from '../component/parteners-card/parteners-card';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-parteners',
  imports: [
    CommonModule,
    AnimateOnScrollModule,
    HeroCard,
    LucideAngularModule,
    Button,
    PartenersCard,
    PartenersSkeleton
  ],
  templateUrl: './parteners.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Parteners {
  parteners = PARTNERS;
  icons = {
    handshake: Handshake,
    arrowRight: ArrowRight
  };

  loading = signal(false);

  allParteners: IPartner[] = PARTNERS;

  Parteners: IPartner[] = [...this.allParteners];
  lightboxOpen = signal(false);
  currentIndex = signal(0);

  page = signal(1);
  perPage = 12;
  isActiveCategory = signal<string | null>(null);

  current = signal<IPartner | null>(null);

  filtered = () => this.Parteners.slice(0, this.page() * this.perPage);

  canLoadMore = () => this.filtered().length < this.Parteners.length;

  loadMore() {
    this.page.update((p) => p + 1);
  }

  listCategories() {
    const uniques = Array.from(
      new Set(this.allParteners.map((photo) => photo.category).filter((c): c is string => !!c))
    );
    return uniques;
  }

  filterByCategory(item: string): void {
    this.Parteners = this.allParteners.filter((photo) => photo.category === item);
    this.page.set(1);
    this.isActiveCategory.set(item);
  }

  resetFilter(): void {
    this.Parteners = [...this.allParteners];
    this.page.set(1);
    this.isActiveCategory.set(null);
  }

  isActiveButton(category: string): boolean {
    return this.isActiveCategory() === category;
  }
}
