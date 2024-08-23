import { Component } from '@angular/core';

@Component({
  selector: 'landing-services',
  standalone: true,
  imports: [],
  templateUrl: './services.component.html'
})
export class ServicesComponent {
  services: { title: string; description: string; icon: string }[] = [
    {
      title: "Camps d'innovation",
      description:
        "Apprenez des compétences et mettez toute suite a l'œuvre pour construire des prototypes et solutions innovantes pour votre groupe ou votre entreprise",
      icon: 'code'
    },
    {
      title: 'Ecosystème building & engagment',
      description:
        "Nous formulons des projets et des plaidoyers pour des politiques publiquesen faveur des acteurs de l'entreprenariat innovant en ligne",
      icon: 'smartphone'
    },
    {
      title: 'Incubation',
      description:
        "Nous offrons un accompagnement en pré-incubation , incubation, post-incubation avec des méthodes accréditées a l'international",
      icon: 'search'
    },
    {
      title: 'Capacity building',
      description:
        'Nous mettons a disposition une gamme variée de workshops et activités adaptés aux jeunes entrepreneurs, aux mentors et coachs',
      icon: 'users'
    }
  ];
}
