import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ObserveVisibilityDirective } from 'app/common/directives/observer.directive';
import { stakeholders } from './utils/data/stakeholders';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, MatIconModule, ObserveVisibilityDirective, CommonModule],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  stakeholdersPurposes = stakeholders;
}
