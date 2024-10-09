import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ObserveVisibilityDirective } from 'app/core/directives/observer.directive';
import { stakeholders } from './data/stakeholders';

@Component({
  selector: 'landing-hero',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, MatIconModule, ObserveVisibilityDirective, CommonModule],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  stakeholdersPurposes = stakeholders;
}
