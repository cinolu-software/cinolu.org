import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  MoveUpRight,
  UserPlus,
  Users,
} from 'lucide-angular';
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

@Component({
  selector: 'app-highlight-card',
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterLink,
    LucideAngularModule,
    ApiImgPipe,
    AnimateOnScrollModule,
  ],
  styles: [
    `
      :host {
        @keyframes slidedown-icon {
          0% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(20px);
          }

          100% {
            transform: translateY(0);
          }
        }

        .slidedown-icon {
          animation: slidedown-icon;
          animation-duration: 3s;
          animation-iteration-count: infinite;
        }

        .box {
          background-image: radial-gradient(
            var(--primary-300),
            var(--primary-600)
          );
          border-radius: 50% !important;
          color: var(--primary-color-text);
        }
      }
    `,
  ],

  templateUrl: './highlight-card.html',
})
export class HighlightCard {
  @Input() keys: HighlightKey[] = [];
  @Input() selectedKey!: HighlightKey;
  @Input() data: (IProgram | ISubprogram | IEvent | IProject | IArticle)[] = [];
  @Output() keySelected = new EventEmitter<HighlightKey>();

  icons = { moveUp: MoveUpRight, userPlus: UserPlus, users: Users };

  selectKey(key: HighlightKey) {
    this.keySelected.emit(key);
  }

  getItemTitle(
    item: IProgram | ISubprogram | IEvent | IProject | IArticle,
  ): string {
    return 'name' in item ? item.name : (item.title ?? 'Titre inconnu');
  }

  getItemDescription(
    item: IProgram | ISubprogram | IEvent | IProject | IArticle,
  ): string {
    return 'description' in item ? item.description : (item.summary ?? '');
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

  trackByFn(index: number, item: { id?: string }): string {
    return item.id ?? index.toString();
  }
}
