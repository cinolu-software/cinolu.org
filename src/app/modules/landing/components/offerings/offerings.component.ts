import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ObserveVisibilityDirective } from 'app/core/directives/observer.directive';

@Component({
  selector: 'our-offerings',
  standalone: true,
  imports: [ObserveVisibilityDirective, MatIconModule],
  templateUrl: './offerings.component.html'
})
export class OfferingsComponent {
  offerings: { title: string; description: string; icon: string }[] = [
    {
      title: "Soutien complet de l'écosystème",
      description: 'Offrir un soutien global pour aider les innovateurs et entrepreneurs à chaque étape.',
      icon: 'public'
    },
    {
      title: 'Compétences validées',
      description: 'Fournir des compétences certifiées et reconnues par les standards internationaux.',
      icon: 'verified'
    },
    {
      title: 'Programmes de niveau international',
      description: "Proposer des programmes d'accompagnement alignés aux normes internationales.",
      icon: 'school'
    },
    {
      title: 'Réseau panafricain',
      description: "Connecter les innovateurs à un vaste réseau à l'échelle du continent africain.",
      icon: 'language'
    },
    {
      title: "Acteurs dynamiques de l'écosystème",
      description: "Collaborer avec des acteurs clés et dynamiques de l'écosystème entrepreneurial.",
      icon: 'group'
    }
  ];
}
