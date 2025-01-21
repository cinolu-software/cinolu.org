import { ILink } from '../types/link.type';

export const explorationLinks: ILink[] = [
  {
    name: $localize`Accueil`,
    path: '/',
    description: $localize`Découvez la plateforme`,
    icon: 'mat_outline:home',
    exactUrl: true
  },
  {
    name: $localize`Programmes`,
    path: '/projects',
    description: $localize`Voir nos programmes`,
    icon: 'mat_outline:assignment',
    exactUrl: false
  },
  {
    name: $localize`Evénements`,
    path: '/events',
    description: $localize`Voir nos événements`,
    icon: 'mat_outline:event',
    exactUrl: false
  },
  {
    name: $localize`Partenaires`,
    path: '/',
    fragment: 'partners',
    description: $localize`Voir nos partenaires`,
    icon: 'mat_outline:groups',
    exactUrl: true
  }
];

export const myCinoluLinks: ILink[] = [
  {
    name: $localize`A propos`,
    path: '/about-us',
    fragment: 'about',
    description: $localize`A propos de nous`,
    icon: 'mat_outline:info',
    exactUrl: false
  },

  {
    name: $localize`Equipe`,
    path: '/about-us',
    fragment: 'team',
    description: $localize`Voir notre équipe`,
    icon: 'mat_outline:groups',
    exactUrl: false
  },
  {
    name: $localize`Coachs & mentors`,
    path: '/about-us',
    fragment: 'coachs',
    description: $localize`Voir nos mentors`,
    icon: 'mat_outline:support_agent',
    exactUrl: false
  },
  {
    name: $localize`Vision`,
    path: '/about-us',
    fragment: 'vision',
    description: $localize`Voir notre vision`,
    icon: 'mat_outline:insights',
    exactUrl: false
  }
];

export const socialLinks: ILink[] = [
  { name: 'Facebook', path: 'https://www.facebook.com/share/15cR36qNs8/?mibextid=kFxxJD', external: true },
  { name: 'Twitter', path: 'https://x.com/Lubumdigital?t=MYcaQ_OEdCO3KZDCQzMoeQ&s=09', external: true },
  { name: 'LinkedIn', path: 'https://www.linkedin.com/company/cinolu/', external: true }
];
