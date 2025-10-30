import { Component } from '@angular/core';
import { STATS } from '../../data/stats.data';
import { LucideAngularModule, HandCoins, Lightbulb, MoveUpRight, User, UserPlus } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CountUpDirective } from '../../../../common/directives/count-up.directive';
import { FadeInOnScrollDirective } from '../../../../common/directives/animations-on-scroll.directive';
import { REASONS } from '../../data/reasons-join-us.data';

@Component({
  selector: 'app-why-join-us',
  imports: [LucideAngularModule, ButtonModule, CountUpDirective, FadeInOnScrollDirective],
  templateUrl: './why-join-us.html',
  styles: ``,
})
export class WhyJoinUs {
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
