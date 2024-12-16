import { ILink } from './types/link.type';

export const explorationLinks: ILink[] = [
  {
    name: 'Programmes',
    path: '/programs',
    description: 'Voir nos programmes',
    icon: 'mat_outline:assignment',
    exactUrl: false
  },
  {
    name: 'Evénements',
    path: '/events',
    description: 'Voir nos événements',
    icon: 'mat_outline:event',
    exactUrl: false
  }
];

export const myCinoluLinks: ILink[] = [
  {
    name: 'Equipe',
    path: '/#team',
    description: 'Voir notre équipe',
    icon: 'mat_outline:groups',
    exactUrl: false
  },
  {
    name: 'Coachs & mentors',
    path: '/#coachs',
    description: 'Voir nos mentors',
    icon: 'mat_outline:support_agent',
    exactUrl: false
  },
  {
    name: 'Partenaires',
    path: '/#partners',
    description: 'Voir nos partenaires',
    icon: 'mat_outline:corporate_fare',
    exactUrl: false
  }
];
