import { Component } from '@angular/core';
import { STATS } from '../../data/stats.data';
import { HandCoins, Lightbulb, LucideAngularModule, MoveUpRight, User } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { REASONS } from '../../data/reasons-join-us.data';
import { CountUpDirective } from '../../../../shared/directives/count-up.directive';

@Component({
  selector: 'app-why-join-us',
  imports: [LucideAngularModule, ButtonModule, CountUpDirective],
  templateUrl: './why-join-us.component.html',
  styles: ``
})
export class WhyJoinUsComponent {
  stats = STATS;
  reason = REASONS;
  icons = {
    lightbulb: Lightbulb,
    moveUp: MoveUpRight,
    donate: HandCoins,
    users: User
  };
}
