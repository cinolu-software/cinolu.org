import { Component } from '@angular/core';
import { fadeInStagger } from '../../../shared/animations/fade';
import { stats } from '../../utils/data/stats';
import { LucideAngularModule, Lightbulb } from 'lucide-angular';

@Component({
  selector: 'app-hero',
  imports: [LucideAngularModule],
  templateUrl: './hero.component.html',
  animations: [fadeInStagger],
})
export class HeroComponent {
  stats = stats;
  icons = {
    lightbulb: Lightbulb,
  };
}
