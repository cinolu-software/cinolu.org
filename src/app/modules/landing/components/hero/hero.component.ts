import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ObserveVisibilityDirective } from 'app/core/directives/observer.directives';

@Component({
  selector: 'landing-hero',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, MatIconModule, ObserveVisibilityDirective],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  debounceTimes: number[] = [0, 100, 200, 300, 400];
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
}
