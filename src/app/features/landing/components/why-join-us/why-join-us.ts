import { Component, ChangeDetectionStrategy } from '@angular/core';
import { STATS } from '../../data/stats.data';
import { LucideAngularModule, HandCoins, Lightbulb, MoveUpRight, User, UserPlus } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CountUpDirective } from '../../../../shared/directives/count-up.directive';
import { FadeInOnScrollDirective } from '../../../../shared/directives/animations-on-scroll.directive';
import { REASONS } from '../../data/reasons-join-us.data';

@Component({
  selector: 'app-why-join-us',
  imports: [LucideAngularModule, ButtonModule, CountUpDirective, FadeInOnScrollDirective],
  templateUrl: './why-join-us.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhyJoinUs {
  stats = STATS;
  reason = REASONS;
  icons = {
    lightbulb: Lightbulb,
    moveUp: MoveUpRight,
    donate: HandCoins,
    users: User,
    userPlus: UserPlus
  };

  trackByIndex(index: number): number {
    return index;
  }
}
