import { ILink } from '../types/link.type';

export const EXPLORATION_LINKS: ILink[] = [
  {
    name: 'Accueil',
    path: '/',
    description: 'Découvez la plateforme',
    icon: 'matHomeOutline',
    exactUrl: true
  },
  {
    name: 'Programmes',
    path: '/programs',
    description: 'Voir nos programmes',
    icon: 'matAssignmentOutline',
    exactUrl: false
  },
  {
    name: 'Evénements',
    path: '/events',
    description: 'Voir nos événements',
    icon: 'matEventNoteOutline',
    exactUrl: false
  },
  {
    name: 'Ecosystème',
    path: '/',
    fragment: 'ecosystem',
    description: 'Voir nos partenaires',
    icon: 'matGroups2Outline',
    exactUrl: true
  },
  {
    name: 'Notre Blog',
    path: '/blog',
    description: 'Le blog',
    icon: 'matForumOutline',
    exactUrl: false
  }
];

export const MY_CINOLU_LINKS: ILink[] = [
  {
    name: 'A propos',
    path: '/about-us',
    fragment: 'about',
    description: 'A propos de nous',
    icon: 'matInfoOutline',
    exactUrl: false
  },

  {
    name: 'Equipe',
    path: '/about-us',
    fragment: 'team',
    description: 'Voir notre équipe',
    icon: 'matGroupWorkOutline:',
    exactUrl: false
  },
  {
    name: 'Coachs & mentors',
    path: '/about-us',
    fragment: 'coachs',
    description: 'Voir nos mentors',
    icon: 'matSupportAgentOutline',
    exactUrl: false
  },
  {
    name: 'Vision',
    path: '/about-us',
    fragment: 'vision',
    description: 'Voir notre vision',
    icon: 'matInsightsOutline',
    exactUrl: false
  }
];

export const SOCIAL_LINKS: ILink[] = [
  { name: 'Facebook', path: 'https://www.facebook.com/share/15cR36qNs8/?mibextid=kFxxJD', external: true },
  { name: 'Twitter', path: 'https://x.com/Lubumdigital?t=MYcaQ_OEdCO3KZDCQzMoeQ&s=09', external: true },
  { name: 'LinkedIn', path: 'https://www.linkedin.com/company/cinolu/', external: true }
];
