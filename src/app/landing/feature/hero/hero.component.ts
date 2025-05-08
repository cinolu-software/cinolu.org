import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { fadeInStagger } from '../../../shared/animations/fade';
import { NgIcon } from '@ng-icons/core';
import { stats } from 'app/landing/utils/data/stats';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, NgIcon],
  templateUrl: './hero.component.html',
  animations: [fadeInStagger]
})
export class HeroComponent {
  stats = stats;
}
