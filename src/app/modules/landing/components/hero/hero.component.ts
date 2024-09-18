import { CommonModule, NgOptimizedImage } from '@angular/common';
import { afterNextRender, Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ObserveVisibilityDirective } from 'app/core/directives/observer.directives';

@Component({
  selector: 'landing-hero',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, MatIconModule, ObserveVisibilityDirective, CommonModule],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  currentImage = signal(0);
  images: string[] = [
    '/images/purposes/corporate.webp',
    '/images/purposes/iso.webp',
    '/images/purposes/startup.webp',
    '/images/purposes/government.webp',
    '/images/team/all.jpg'
  ];
  stakeholdersPurposes: { title: string; description: string; icon: string }[] = [
    {
      title: 'Corporates',
      description: "Intégrez l'innovation et créez des synergies avec les startups et PMEs.",
      icon: 'location_city'
    },
    {
      title: 'ISA & ESE',
      description: "Renforçons notre impact et réseau dans l'écosystème entrepreneurial global.",
      icon: 'travel_explore'
    },
    {
      title: 'Startups et PMEs',
      description: 'Accédez à des ressources, du mentorat et des opportunités de financement.',
      icon: 'lightbulb'
    },
    {
      title: 'Institutions',
      description: "Élaborez des politiques favorables à l'innovation et soutenez le développement.",
      icon: 'flag'
    }
  ];

  constructor() {
    afterNextRender(() => {
      setInterval(() => {
        this.currentImage.update((v) => (v + 1) % this.images.length);
      }, 5000);
    });
  }
}
