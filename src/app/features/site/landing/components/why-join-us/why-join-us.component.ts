import { Component } from '@angular/core';
import { STATS } from '../../data/stats.data';
import {
  HandCoins,
  Lightbulb,
  LucideAngularModule,
  MoveUpRight,
  User,
  UserPlus,
} from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CountUpDirective } from '../../../../../shared/directives/count-up.directive';
import { RouterLink } from '@angular/router';
import { FadeInOnScrollDirective } from '../../../../../shared/directives/animations-on-scroll.directive';
import { REASONS } from '../../data/reasons-join-us.data';

@Component({
  selector: 'app-why-join-us',
  imports: [
    LucideAngularModule,
    ButtonModule,
    CountUpDirective,
    RouterLink,
    FadeInOnScrollDirective,
  ],
  templateUrl: './why-join-us.component.html',
  styles: ``,
})
export class WhyJoinUsComponent {
  stats = STATS;
  reason = REASONS;
  icons = {
    lightbulb: Lightbulb,
    moveUp: MoveUpRight,
    donate: HandCoins,
    users: User,
    userPlus: UserPlus,
  };
}
