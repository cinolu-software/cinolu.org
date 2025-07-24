import { Component } from '@angular/core';
import { STATS } from '../../data/stats.data';
import { LucideAngularModule, Lightbulb, MoveRight, HandCoins } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [LucideAngularModule, RouterLink],
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
