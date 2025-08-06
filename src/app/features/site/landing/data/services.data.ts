import { Lightbulb, Globe, LucideIconData, BarChart3, Rocket, Handshake } from 'lucide-angular';

interface IService {
  title: string;
  description: string;
  icon: LucideIconData;
}

export const SERVICES: IService[] = [
  {
    title: 'Innovative Solutions',
    description: 'Identifier des solutions innovantes à des défis spécifiques',
    icon: Lightbulb
  },
  {
    title: 'Co-Creation de Startups',
    description: 'Co-créer avec des startups ou talents locaux',
    icon: Handshake
  },
  {
    title: 'Innovation Challenges',
    description: 'Lancer des appels à innovation ou défis thématiques',
    icon: Rocket
  },
  {
    title: 'Project Management',
    description: 'Piloter des projets de transformation ou d’impact',
    icon: BarChart3
  },
  {
    title: 'Ecosystem Mapping',
    description: 'Cartographier ou renforcer un écosystème local',
    icon: Globe
  }
];
