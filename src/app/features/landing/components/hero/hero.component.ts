import { Component } from '@angular/core';
import { STATS } from '../../data/stats.data';
import { LucideAngularModule, Lightbulb, MoveRight, HandCoins } from 'lucide-angular';

@Component({
  selector: 'app-hero',
  imports: [LucideAngularModule],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  stats = STATS;
  icons = {
    lightbulb: Lightbulb,
    arrowFlesh: MoveRight,
    donate: HandCoins
  };
}
