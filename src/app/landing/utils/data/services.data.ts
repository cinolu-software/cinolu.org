import { IService } from '../types/service.type';
import { Lightbulb, Globe, BadgeCheck } from 'lucide-angular';

export const services: IService[] = [
  {
    title: 'Innovation',
    description:
      "Nous impulsons la créativité et le développement de solutions aux problématiques sociétales via l'open innovation.",
    icon: Lightbulb,
  },
  {
    title: 'Ecosystème Building',
    description:
      "Nous formulons des projets et des plaidoyers pour des politiques publiques favorisant les acteurs de l'entrepreneuriat innovant.",
    icon: Globe,
  },
  {
    title: 'Capacity Building',
    description:
      "Nous mettons à disposition une gamme variée de workshops et d'activités adaptés aux jeunes entrepreneurs et aux mentors.",
    icon: BadgeCheck,
  },
];
