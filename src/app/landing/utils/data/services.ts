import { IService } from '../types/service.type';

export const services: IService[] = [
  {
    title: $localize`Innovation`,
    description: $localize`Nous impulsons la créativité et le développement de solutions aux problématiques sociétales via l'open innovation.`,
    icon: 'lightbulb'
  },
  {
    title: $localize`Ecosystème Building`,
    description: $localize`Nous formulons des projets et des plaidoyers pour des politiques publiques favorisant les acteurs de l'entrepreneuriat innovant.`,
    icon: 'public'
  },
  {
    title: $localize`Capacity Building`,
    description: $localize`Nous mettons à disposition une gamme variée de workshops et d'activités adaptés aux jeunes entrepreneurs et aux mentors.`,
    icon: 'verified'
  },
  {
    title: $localize`Incubation`,
    description: $localize`Nous offrons un accompagnement en pré-incubation, incubation et post-incubation avec des méthodes accréditées à l'international.`,
    icon: 'school'
  }
];
