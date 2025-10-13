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
          -webkit-line-clamp: 3 !important;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          hyphens: none;
          word-break: break-word;
          margin-top: 0.5rem;
        }

        .perspective {
          perspective: 1000px;
        }

        .card {
          width: 100%;
          height: 100%;
          border-radius: 1rem;
          background: white;
          padding: 1.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          top: 0;
          left: 0;
          transition: all 0.5s ease;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          position: absolute;
          z-index: 1;
          opacity: 0.6;
          transform: scale(0.9) translateY(20px);
        }

        .card.active {
          z-index: 3;
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        .card.prev {
          z-index: 2;
          opacity: 0.6;
          transform: scale(0.85) translateY(-20px) rotateY(-10deg);
        }

        .card.next {
          z-index: 2;
          opacity: 0.6;
          transform: scale(0.85) translateY(20px) rotateY(10deg);
        }
      }
    `,
  ],
})
export class HighlightCard2 implements OnInit, OnDestroy {
  @Input() keys: HighlightKey[] = [];
  @Input() selectedKey!: HighlightKey;
  @Input() data: (IProgram | ISubprogram | IEvent | IProject | IArticle)[] = [];
  @Output() keySelected = new EventEmitter<HighlightKey>();

  activeIndex = 0;
  carouselSub!: Subscription;
  icons = { moveUp: MoveUpRight };

  ngOnInit() {
    this.startAutoRotation();
  }

  ngOnDestroy() {
    this.carouselSub?.unsubscribe();
  }

  selectKey(key: HighlightKey) {
    this.selectedKey = key;
    this.activeIndex = 0;
    this.keySelected.emit(key);
  }

  startAutoRotation() {
    this.carouselSub = interval(5000).subscribe(() => {
      if (this.data.length > 1) {
        this.activeIndex = (this.activeIndex + 1) % this.data.length;
      }
    });
  }

  getItemTitle(item: IProgram | ISubprogram | IEvent | IProject | IArticle): string {
    return 'name' in item ? item.name : (item.title ?? 'Titre inconnu');
  }

  getItemDescription(item: IProgram | ISubprogram | IEvent | IProject | IArticle): string {
    return 'description' in item ? item.description : (item.summary ?? '');
  }

  whatIsDisplayed(): string {
    switch (this.selectedKey?.key) {
      case 'programs':
        return 'default';
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

  isVisible(index: number): boolean {
    const total = this.data.length;
    return [(this.activeIndex - 1 + total) % total, this.activeIndex, (this.activeIndex + 1) % total].includes(index);
  }

  trackByFn(index: number, item: { id?: string }): string {
    return item.id ?? index.toString();
  }

  whatIsPath(): string {
    switch (this.selectedKey?.key) {
      case 'programs':
        return 'our-programs';
      case 'subprograms':
        return 'our-programs/' + this.selectedKey.key + '/';
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
}
