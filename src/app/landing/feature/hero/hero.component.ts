import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { stakeholders } from '../../utils/data/stakeholders';
import { RouterLink } from '@angular/router';
import { fadeInStagger } from '../../../shared/utils/animations/fade';

@Component({
  selector: 'app-hero',
  imports: [MatIconModule, CommonModule, RouterLink],
  templateUrl: './hero.component.html',
  animations: [fadeInStagger]
})
export class HeroComponent {
  stakeholdersPurposes = stakeholders;
}
