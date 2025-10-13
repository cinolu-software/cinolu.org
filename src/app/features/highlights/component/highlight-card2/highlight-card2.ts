import { Component, Input, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, MoveUpRight } from 'lucide-angular';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';

import {
  IHighlight,
  IProgram,
  ISubprogram,
  IEvent,
  IProject,
  IArticle,
} from '../../../../shared/models/entities.models';

export interface HighlightKey {
  id: number;
  name: string;
  key: keyof IHighlight;
}

type HighlightItem = IProgram | ISubprogram | IEvent | IProject | IArticle;

@Component({
  selector: 'app-highlight-card2',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ApiImgPipe],
  templateUrl: './highlight-card2.html',
  styles: [
    `
      :host {
        .perspective-1000 {
          perspective: 1000px;
        }

        .card-3d {
          transform-style: preserve-3d;
          position: relative;
          width: 100%;
          height: 100%;
        }

        .card-face {
          backface-visibility: hidden;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .front {
          transform: rotateY(0deg);
        }

        .back {
          transform: rotateY(180deg);
        }

        @keyframes fade-in-3d {
          from {
            opacity: 0;
            transform: translateY(10px) rotateY(10deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateY(0);
          }
        }

        .card-face {
          animation: fade-in-3d 0.8s ease;
        }
      }
    `,
  ],
})
export class HighlightCardC2 implements OnInit, OnDestroy {
  @Input() keys: HighlightKey[] = [];
  @Input() data: HighlightItem[] = [];

  selectedIndex = signal(0);
  intervalId?: number;

  icons = { moveUp: MoveUpRight };

  ngOnInit() {
    this.intervalId = window.setInterval(() => this.nextCard(), 6000);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  selectKey(index: number) {
    this.selectedIndex.set(index);
  }

  nextCard() {
    this.selectedIndex.set((this.selectedIndex() + 1) % this.keys.length);
  }

  get selectedKey(): HighlightKey {
    return this.keys[this.selectedIndex()] ?? { id: 0, name: '', key: 'programs' };
  }

  get selectedItem(): HighlightItem | undefined {
    return this.data[this.selectedIndex()];
  }

  getItemTitle(item: HighlightItem): string {
    return 'name' in item ? item.name : ((item as IArticle).title ?? '');
  }

  getItemDescription(item: HighlightItem): string {
    return 'description' in item ? item.description : ((item as IArticle).summary ?? '');
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
}
