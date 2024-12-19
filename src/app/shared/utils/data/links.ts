import { ILink } from '../types/link.type';

export const explorationLinks: ILink[] = [
  {
    name: 'Accueil',
    path: '/',
    description: 'Découvez la plateforme',
    icon: 'mat_outline:home',
    exactUrl: true
  },
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
  },
  {
    name: 'Partenaires',
    path: '/',
    fragment: 'partners',
    description: 'Voir nos événements',
    icon: 'mat_outline:groups',
    exactUrl: true
  }
];

export const myCinoluLinks: ILink[] = [
  {
    name: 'A propos',
    path: '/about-us',
    fragment: 'about',
    description: 'A propos de nous',
    icon: 'mat_outline:info',
    exactUrl: false
  },
  {
    name: 'Equipe',
    path: '/about-us',
    fragment: 'team',
    description: 'Voir notre équipe',
    icon: 'mat_outline:groups',
    exactUrl: false
  },
  {
    name: 'Coachs & mentors',
    path: '/about-us',
    fragment: 'coachs',
    description: 'Voir nos mentors',
    icon: 'mat_outline:support_agent',
    exactUrl: false
  },
  {
    name: 'Vision',
    path: '/about-us',
    fragment: 'vision',
    description: 'Voir notre vision',
    icon: 'mat_outline:insights',
    exactUrl: false
  }
];

export const socialLinks: ILink[] = [
  { name: 'Facebook', path: 'https://www.facebook.com/share/15cR36qNs8/?mibextid=kFxxJD', external: true },
  { name: 'Twitter', path: 'https://x.com/Lubumdigital?t=MYcaQ_OEdCO3KZDCQzMoeQ&s=09', external: true },
  { name: 'LinkedIn', path: 'https://www.linkedin.com/company/cinolu/', external: true }
];
