import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  MoveUpRight,
  UserPlus,
  Users,
} from 'lucide-angular';
import { FadeInOnScrollDirective } from '../../../../shared/directives/animations-on-scroll.directive';
import { HighlightsStore } from '../../../highlights/store/highlights.store';
import {
  IHighlight,
  IProgram,
  ISubprogram,
  IEvent,
  IProject,
  IArticle,
} from '../../../../shared/models/entities.models';

@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    FadeInOnScrollDirective,
    NgOptimizedImage,
    ApiImgPipe,
    RouterLink,
  ],
  providers: [HighlightsStore],
  templateUrl: `./highlights.html`,
})
export class Highlights {
  store = inject(HighlightsStore);

  icons = { moveUp: MoveUpRight, userPlus: UserPlus, users: Users };

  keys: { id: number; name: string; key: keyof IHighlight }[] = [
    { id: 1, name: 'Programmes', key: 'programs' },
    { id: 2, name: 'Sous-programmes', key: 'subprograms' },
    { id: 3, name: 'Événements', key: 'events' },
    { id: 4, name: 'Projets', key: 'projects' },
    { id: 5, name: 'Articles', key: 'articles' },
  ];

  whatIsDisplayed(): string {
    switch (this.selectedKey.key) {
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
    switch (this.selectedKey.key) {
      case 'programs':
        return 'our-programs';
      case 'subprograms':
        return 'our-programs';
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

  selectedKey = this.keys[0];

  selectKey(key: { id: number; name: string; key: keyof IHighlight }) {
    this.selectedKey = key;
  }

  get selectedData(): (
    | IProgram
    | ISubprogram
    | IEvent
    | IProject
    | IArticle
  )[] {
    const highlights = this.store.highlights();
    return highlights?.[this.selectedKey.key] ?? [];
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

  trackByFn(index: number, item: { id?: string }): string {
    return item.id ?? index.toString();
  }
}
