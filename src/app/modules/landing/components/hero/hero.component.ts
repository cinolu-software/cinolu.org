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
  purposes: { title: string; description: string; icon: string }[] = [
    {
      title: 'Startups et PMEs',
      description: 'Obtenez les ressources, du mentorat et des opportunités de financement',
      icon: 'lightbulb'
    },
    {
      title: 'ISOs & ESOs',
      description: "Améliorons notre impact et  réseau tout contribuant ainsi à l'écosystème entrepreneurial global",
      icon: 'euro_symbol'
    },
    {
      title: 'Corporates & Organisations',
      description: "Intégration de l'innovation dans vos processus, créer des synergies avec les startups et les PMEs",
      icon: 'location_city'
    },
    {
      title: 'Gouvernement & Institutions',
      description:
        "Élaborer les politiques publiques favorables à l'innovation, soutient des initiatives de développement",
      icon: 'check_circle'
    }
  ];
}
