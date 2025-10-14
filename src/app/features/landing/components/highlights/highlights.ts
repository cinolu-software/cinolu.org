import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { HighlightsStore } from '../../../highlights/store/highlights.store';
import { HighlightKey } from '../../../highlights/component/highlight-card/highlight-card';
import { IProgram, ISubprogram, IEvent, IProject, IArticle } from '../../../../shared/models/entities.models';
import { interval, Subscription } from 'rxjs';
import { FadeInOnScrollDirective } from '../../../../shared/directives/animations-on-scroll.directive';
import { LucideAngularModule } from 'lucide-angular';
import { HighlightCard2 } from '../../../highlights/component/highlight-card2/highlight-card2';

@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [LucideAngularModule, FadeInOnScrollDirective, HighlightCard2],
  providers: [HighlightsStore],
  templateUrl: `./highlights.html`,
})
export class Highlights implements OnInit, OnDestroy {
  store = inject(HighlightsStore);

  keys: HighlightKey[] = [
    { id: 1, name: 'Programmes', key: 'programs' },
    { id: 2, name: 'Sous-programmes', key: 'subprograms' },
    { id: 3, name: 'Événements', key: 'events' },
    { id: 4, name: 'Projets', key: 'projects' },
    { id: 5, name: 'Articles', key: 'articles' },
  ];

  selectedKey: HighlightKey = this.keys[0];
  selectedData: (IProgram | ISubprogram | IEvent | IProject | IArticle)[] = [];

  private carouselSub!: Subscription;

  ngOnInit() {
    this.updateSelectedData();

    this.carouselSub = interval(10000).subscribe(() => {
      const currentIndex = this.keys.findIndex((k) => k.id === this.selectedKey.id);
      const nextIndex = (currentIndex + 1) % this.keys.length;
      this.selectedKey = this.keys[nextIndex];
      this.updateSelectedData();
    });
  }

  ngOnDestroy() {
    this.carouselSub?.unsubscribe();
  }

  selectKey(key: HighlightKey) {
    this.selectedKey = key;
    this.updateSelectedData();
  }

  private updateSelectedData() {
    const highlights = this.store.highlights();
    this.selectedData = highlights?.[this.selectedKey.key] ?? [];
  }
}
