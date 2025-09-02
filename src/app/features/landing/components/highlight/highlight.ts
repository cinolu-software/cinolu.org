import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import {
  LucideAngularModule,
  MoveUpRight,
  UserPlus,
  Users,
} from 'lucide-angular';
import { CountUpDirective } from '../../../../shared/directives/count-up.directive';
import { HighlightsStore } from '../../../highlight/store/highlights.store';
import { CommonModule } from '@angular/common';
import { FadeInOnScrollDirective } from '../../../../shared/directives/animations-on-scroll.directive';

@Component({
  selector: 'app-highlight',
  providers: [HighlightsStore],
  imports: [
    LucideAngularModule,
    RouterLink,
    CountUpDirective,
    CommonModule,
    FadeInOnScrollDirective,
  ],
  templateUrl: './highlight.html',
})
export class Highlight implements OnInit {
  store = inject(HighlightsStore);

  icons = {
    moveUp: MoveUpRight,
    userPlus: UserPlus,
    users: Users,
  };

  ngOnInit(): void {
    this.store.highlight();
  }
}
