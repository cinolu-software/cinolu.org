
import { Component } from '@angular/core';
import { fadeInStagger } from '../../../shared/animations/fade';
import { NgIcon } from '@ng-icons/core';
import { stats } from '../../utils/data/stats';

@Component({
  selector: 'app-hero',
  imports: [NgIcon],
  templateUrl: './hero.component.html',
  animations: [fadeInStagger],
})
export class HeroComponent {
  stats = stats;
}
