import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { stakeholders } from '../../utils/data/stakeholders';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [MatIconModule, CommonModule, RouterLink],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  stakeholdersPurposes = stakeholders;
}
