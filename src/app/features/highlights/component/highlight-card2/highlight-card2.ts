import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, MoveUpRight } from 'lucide-angular';
import { Button } from 'primeng/button';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { interval, Subscription } from 'rxjs';
import {
  IHighlight,
  IProgram,
  ISubprogram,
  IEvent,
  IProject,
  IArticle,
} from '../../../../shared/models/entities.models';
import { QuillViewComponent } from 'ngx-quill';

export interface HighlightKey {
  id: number;
  name: string;
  key: keyof IHighlight;
}

type HighlightItem = IProgram | ISubprogram | IEvent | IProject | IArticle;

@Component({
  selector: 'app-highlight-card2',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, LucideAngularModule, Button, ApiImgPipe, QuillViewComponent],
  templateUrl: './highlight-card2.html',
  styles: [
    `
      :host {
        .quill-prose .ql-editor {
          font-family: inherit;
          font-size: 1rem;
          color: #4b5563;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 4 !important;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          word-break: break-word;
          margin-top: 0.5rem;
        }

        .card {
          @apply absolute rounded-xl bg-white shadow-lg overflow-hidden transition-all duration-700 ease-in-out flex flex-col;
        }

        .card img {
          @apply w-full h-1/2 object-cover;
        }

        .card-content {
          @apply p-4 flex flex-col justify-between flex-1;
        }
      }
    `,
  ],
})
export class HighlightCard2 implements OnInit, OnDestroy {
  @Input() keys: HighlightKey[] = [];
  @Input() selectedKey!: HighlightKey;
  @Input() data: HighlightItem[] = [];
  @Output() keySelected = new EventEmitter<HighlightKey>();

  activeIndex = 0;
  carouselSub?: Subscription;
  icons = { moveUp: MoveUpRight };

  ngOnInit() {
    this.startAutoRotation();
  }

  ngOnDestroy() {
    this.carouselSub?.unsubscribe();
  }

  startAutoRotation(): void {
    this.carouselSub = interval(6000).subscribe(() => {
      if (this.data.length > 1) this.nextItem();
    });
  }

  prevItem(): void {
    this.activeIndex = (this.activeIndex - 1 + this.data.length) % this.data.length;
  }

  nextItem(): void {
    this.activeIndex = (this.activeIndex + 1) % this.data.length;
  }

  selectKey(key: HighlightKey): void {
    this.selectedKey = key;
    this.activeIndex = 0;
    this.keySelected.emit(key);
  }

  getItemTitle(item: HighlightItem): string {
    if ('name' in item) return item.name;
    if ('title' in item) return item.title ?? 'Titre inconnu';
    return 'Titre inconnu';
  }

  getItemDescription(item: HighlightItem): string {
    if ('description' in item) return item.description ?? '';
    if ('summary' in item) return item.summary ?? '';
    return '';
  }

  whatIsDisplayed(): string {
    switch (this.selectedKey?.key) {
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

  trackByFn(index: number, item: HighlightItem): string {
    return (item as { id?: string }).id ?? index.toString();
  }

  whatIsPath(): string {
    switch (this.selectedKey?.key) {
      case 'programs':
        return 'our-programs';
      case 'subprograms':
        return `our-programs/${this.selectedKey.key}`;
      case 'events':
        return 'events';
      case 'projects':
        return 'programs';
      case 'articles':
        return 'blog-ressources';
      default:
        return '';
    }
  }

  prevCategory(): HighlightKey | null {
    const index = this.keys.findIndex((k) => k.id === this.selectedKey.id);
    return index > 0 ? this.keys[index - 1] : null;
  }

  nextCategory(): HighlightKey | null {
    const index = this.keys.findIndex((k) => k.id === this.selectedKey.id);
    return index < this.keys.length - 1 ? this.keys[index + 1] : null;
  }
}
