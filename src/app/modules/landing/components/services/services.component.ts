import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ObserveVisibilityDirective } from 'app/core/directives/observer.directives';

@Component({
  selector: 'landing-services',
  standalone: true,
  imports: [ObserveVisibilityDirective, MatIconModule],
  templateUrl: './services.component.html'
})
export class ServicesComponent {
  offerings: { title: string; description: string; icon: string }[] = [
    {
      title: "Soutien complet de l'écosystème",
      description: 'Offrir un soutien global pour aider les innovateurs et entrepreneurs à chaque étape.',
      icon: 'public' // Represents a global or comprehensive ecosystem
    },
    {
      title: 'Compétences validées',
      description: 'Fournir des compétences certifiées et reconnues par les standards internationaux.',
      icon: 'verified' // Represents validated or certified skills
    },
    {
      title: 'Programmes de niveau international',
      description: "Proposer des programmes d'accompagnement alignés aux normes internationales.",
      icon: 'school' // Represents educational or high-standard programs
    },
    {
      title: 'Réseau panafricain',
      description: "Connecter les innovateurs à un vaste réseau à l'échelle du continent africain.",
      icon: 'language' // Represents a broad, international network
    },
    {
      title: "Acteurs dynamiques de l'écosystème",
      description: "Collaborer avec des acteurs clés et dynamiques de l'écosystème entrepreneurial.",
      icon: 'group' // Represents dynamic, collaborative actors
    }
  ];
}
