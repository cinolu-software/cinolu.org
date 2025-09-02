import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  MoveUpRight,
  UserPlus,
  Users,
} from 'lucide-angular';
import { CountUpDirective } from '../../../../shared/directives/count-up.directive';
import { HighlightsStore } from '../../../highlights/store/highlights.store';
import { CommonModule } from '@angular/common';
import { FadeInOnScrollDirective } from '../../../../shared/directives/animations-on-scroll.directive';

@Component({
  selector: 'app-highlights',
  providers: [HighlightsStore],
  imports: [
    LucideAngularModule,
    RouterLink,
    CountUpDirective,
    CommonModule,
    FadeInOnScrollDirective,
  ],
  templateUrl: './highlights.html',
})
export class Highlights {
  store = inject(HighlightsStore);

  icons = {
    moveUp: MoveUpRight,
    userPlus: UserPlus,
    users: Users,
  };
}
