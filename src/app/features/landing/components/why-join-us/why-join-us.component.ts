import { Component } from '@angular/core';
import { STATS } from '../../data/stats.data';
import { HandCoins, Lightbulb, LucideAngularModule, MoveRight } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-why-join-us',
  imports: [LucideAngularModule, ButtonModule],
  templateUrl: './why-join-us.component.html',
  styles: ``
})
export class WhyJoinUsComponent {
  stats = STATS;
  icons = {
    lightbulb: Lightbulb,
    arrowFlesh: MoveRight,
    donate: HandCoins
  };
}
