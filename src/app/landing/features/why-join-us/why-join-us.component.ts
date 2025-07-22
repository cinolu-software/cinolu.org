import { Component } from '@angular/core';
import { stats } from '../../utils/data/stats';
import { HandCoins, Lightbulb, LucideAngularModule, MoveRight } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-why-join-us',
  imports: [LucideAngularModule, ButtonModule],
  templateUrl: './why-join-us.component.html',
  styles: ``
})
export class WhyJoinUsComponent {
  stats = stats;
  icons = {
    lightbulb: Lightbulb,
    arrowFlesh: MoveRight,
    donate: HandCoins
  };
}
