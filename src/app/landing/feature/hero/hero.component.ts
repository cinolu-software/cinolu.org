import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { stakeholders } from '../../utils/data/stakeholders';
import { RouterLink } from '@angular/router';
import { fadeInStagger } from '../../../shared/animations/fade';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, RouterLink, NgIcon],
  templateUrl: './hero.component.html',
  animations: [fadeInStagger]
})
export class HeroComponent {
  stakeholdersPurposes = stakeholders;
}
