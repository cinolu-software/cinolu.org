import { Flag, Users, Briefcase, Globe, Settings } from 'lucide-angular';

export const HISTORY_TIMELINE = [
  {
    status: 'Lancement',
    date: '2015',
    icon: Flag,
    color: '#9C27B0',
    image: 'cinolu-launch.jpg',
    description: 'Lancement du Cinolu, 1er hub d’innovation à Lubumbashi',
  },
  {
    status: 'Programmes',
    date: '2017–2020',
    icon: Users,
    color: '#673AB7',
    description: 'Mise en œuvre de programmes genre & jeunesse (F360, civic tech…)',
  },
  {
    status: 'Incubateur',
    date: '2021',
    icon: Briefcase,
    color: '#FF9800',
    description: 'Déploiement de l’incubateur Ushindi et de cohortes entrepreneuriales',
  },
  {
    status: 'Expansion',
    date: '2023–2024',
    icon: Globe,
    color: '#607D8B',
    description: 'Déploiement régional (SOPA+, Afrilabs, Fikiri…) et création du Cinolu OneStop',
  },
  {
    status: 'Structuration',
    date: '2025',
    icon: Settings,
    color: '#4CAF50',
    description: 'Structuration numérique complète de l’accompagnement et de l’impact',
  },
];
