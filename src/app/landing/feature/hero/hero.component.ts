import { Component } from '@angular/core';
import { stats } from '../../utils/data/stats';
import { LucideAngularModule, Lightbulb } from 'lucide-angular';

@Component({
  selector: 'app-hero',
  imports: [LucideAngularModule],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  stats = stats;
  icons = {
    lightbulb: Lightbulb
  };
}
