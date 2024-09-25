import { CommonModule, NgOptimizedImage } from '@angular/common';
import { afterNextRender, Component, OnDestroy, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ObserveVisibilityDirective } from 'app/core/directives/observer.directive';
import { stakeholders } from './data/stakeholders';
import { sliders } from './data/sliders';

@Component({
  selector: 'landing-hero',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, MatIconModule, ObserveVisibilityDirective, CommonModule],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  currentImage = signal(0);
  images = sliders;
  stakeholdersPurposes = stakeholders;

  constructor() {
    afterNextRender(() => {
      setInterval(() => {
        this.currentImage.update((v) => (v + 1) % this.images.length);
      }, 3000);
    });
  }
}
