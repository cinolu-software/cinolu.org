import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ChevronLeft, ChevronRight, MoveUpRight } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { interval, Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';

import { IArticle, HighlightItem } from '../../../../shared/models/entities.models';

export type HighlightSource = 'programs' | 'subprograms' | 'events' | 'projects' | 'articles';

@Component({
  selector: 'app-highlight-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, LucideAngularModule, ButtonModule, ApiImgPipe],
  templateUrl: './highlight-card.html',
})
export class HighlightCard implements OnInit, OnChanges, OnDestroy {
  private sanitizer = inject(DomSanitizer);

  @Input() data: HighlightItem[] = [];

  activeIndex = 1;
  carouselSub?: Subscription;

  icons = {
    prev: ChevronLeft,
    next: ChevronRight,
    moveUp: MoveUpRight,
  };

  ngOnInit(): void {
    if (this.data.length > 1) {
      this.startAutoRotation();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      console.log('Données reçues dans HighlightCard3 :', this.data);
      this.activeIndex = 1;
      this.carouselSub?.unsubscribe();

      if (this.data.length > 1) {
        this.startAutoRotation();
      }
    }
  }

  ngOnDestroy(): void {
    this.carouselSub?.unsubscribe();
  }

  private startAutoRotation(): void {
    this.carouselSub = interval(7000).subscribe(() => this.nextItem());
  }

  prevItem(): void {
    if (this.data.length > 0) {
      this.activeIndex = (this.activeIndex - 1 + this.data.length) % this.data.length;
    }
  }

  nextItem(): void {
    if (this.data.length > 0) {
      this.activeIndex = (this.activeIndex + 1) % this.data.length;
    }
  }

  get prevItemData(): HighlightItem | null {
    return this.data.length ? this.data[(this.activeIndex - 1 + this.data.length) % this.data.length] : null;
  }

  get currentItem(): HighlightItem | null {
    return this.data.length ? this.data[this.activeIndex] : null;
  }

  get nextItemData(): HighlightItem | null {
    return this.data.length ? this.data[(this.activeIndex + 1) % this.data.length] : null;
  }

  getItemTitle(item: HighlightItem): string {
    return 'name' in item ? item.name : ((item as IArticle).title ?? '');
  }

  getItemDescription(item: HighlightItem): SafeHtml {
    const desc = 'description' in item ? item.description : ((item as IArticle).summary ?? '');
    return this.sanitizer.bypassSecurityTrustHtml(desc);
  }

  getSourceLabel(sourceKey: HighlightSource): string {
    switch (sourceKey) {
      case 'programs':
        return 'Programme';
      case 'subprograms':
        return 'Sous-programme';
      case 'events':
        return 'Événement';
      case 'projects':
        return 'Projet';
      case 'articles':
        return 'Article';
    }
  }

  getPath(sourceKey: HighlightSource, slug?: string): string {
    switch (sourceKey) {
      case 'programs':
        return `/our-programs/${slug ?? ''}`;
      case 'subprograms':
        return `/our-programs/subprograms/${slug ?? ''}`;
      case 'events':
        return `/events/${slug ?? ''}`;
      case 'projects':
        return `/programs/${slug ?? ''}`;
      case 'articles':
        return `/blog-ressources/${slug ?? ''}`;
      default:
        return '/';
    }
  }

  whatIsDisplayed(element: HighlightItem): string {
    switch (element.sourceKey) {
      case 'programs':
        return 'program';
      case 'subprograms':
        return 'subprogram';
      case 'events':
        return 'event';
      case 'projects':
        return 'project';
      case 'articles':
        return 'article';
      default:
        return 'cover';
    }
  }
}
