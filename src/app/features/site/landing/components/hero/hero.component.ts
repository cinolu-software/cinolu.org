import { Component } from '@angular/core';
import { STATS } from '../../data/stats.data';
import {
  Lightbulb,
  MoveRight,
  HandCoins,
  LucideAngularModule,
} from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-hero',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './hero.component.html',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate(
          '700ms ease-in-out',
          style({ opacity: 1, transform: 'translateY(0)' }),
        ),
      ]),
      transition(':leave', [
        animate(
          '700ms ease-in-out',
          style({ opacity: 0, transform: 'translateY(-10px)' }),
        ),
      ]),
    ]),
  ],
})
export class HeroComponent {
  stats = STATS;
  icons = { lightbulb: Lightbulb, arrowFlash: MoveRight, donate: HandCoins };
}
