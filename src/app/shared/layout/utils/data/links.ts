import { ILink } from '../types/link.type';
import { Info, Activity } from 'lucide-angular';

export const EXPLORATION_LINKS: ILink[] = [
  {
    name: 'Accueil',
    path: '/',
    exactUrl: true
  },
  {
    name: 'Programmes',
    path: '/programs',
    exactUrl: false
  },
  {
    name: 'Evénements',
    path: '/events',
    exactUrl: false
  },
  {
    name: 'A propos',
    path: '/about-us',
    exactUrl: false
  }
];

export const MY_CINOLU_LINKS: ILink[] = [
  {
    name: 'A propos',
    path: '/about-us',
    fragment: 'about',
    exactUrl: false
  },
  {
    name: 'Vision',
    path: '/about-us',
    fragment: 'vision',
    exactUrl: false
  }
];

export const PROFILE_LINKS: ILink[] = [
  {
    name: 'Mes informations',
    path: '/profile',
    fragment: 'info',
    icon: Info,
    exactUrl: true
  },
  {
    name: 'Mes enteprises',
    path: '/profile/enterprises',
    fragment: 'info',
    icon: Activity
  }
];

export const SOCIAL_LINKS: ILink[] = [
  { name: 'Facebook', path: 'https://www.facebook.com/share/15cR36qNs8/?mibextid=kFxxJD', external: true },
  { name: 'Twitter', path: 'https://x.com/Lubumdigital?t=MYcaQ_OEdCO3KZDCQzMoeQ&s=09', external: true },
  { name: 'LinkedIn', path: 'https://www.linkedin.com/company/cinolu/', external: true }
];
