import { Component, inject } from '@angular/core';
import {
  LucideAngularModule,
  MoveUpRight,
  UserPlus,
  Users,
} from 'lucide-angular';
import { HighlightsStore } from '../../../highlights/store/highlights.store';
import { CommonModule } from '@angular/common';
import { FadeInOnScrollDirective } from '../../../../shared/directives/animations-on-scroll.directive';

@Component({
  selector: 'app-highlights',
  providers: [HighlightsStore],
  imports: [LucideAngularModule, CommonModule, FadeInOnScrollDirective],
  templateUrl: './highlights.html',
})
export class Highlights {
  store = inject(HighlightsStore);
  icons = {
    moveUp: MoveUpRight,
    userPlus: UserPlus,
    users: Users,
  };

  keys = [
    {
      id: 1,
      name: 'Programs',
    },
    {
      id: 2,
      name: 'Subprograms',
    },
    {
      id: 3,
      name: 'Events',
    },
    {
      id: 4,
      name: 'Projects',
    },
    {
      id: 5,
      name: 'Articles',
    },
  ];

  selectedKey: {
    id: number;
    name: string;
  } = this.keys[0];

  selectKey(key: { id: number; name: string }): void {
    this.selectedKey = key;
  }
}
