import { ILink } from '../types/link.type';
import { Home, ClipboardList, NotepadTextDashed, Info, ChartNoAxesColumn, Activity } from 'lucide-angular';

export const EXPLORATION_LINKS: ILink[] = [
  {
    name: 'Accueil',
    path: '/',
    description: 'Découvez la plateforme',
    icon: Home,
    exactUrl: true
  },
  {
    name: 'Programmes',
    path: '/programs',
    description: 'Voir nos programmes',
    icon: ClipboardList,
    exactUrl: false
  },
  {
    name: 'Evénements',
    path: '/events',
    description: 'Voir nos événements',
    icon: NotepadTextDashed,
    exactUrl: false
  }
];

export const MY_CINOLU_LINKS: ILink[] = [
  {
    name: 'A propos',
    path: '/about-us',
    fragment: 'about',
    description: 'A propos de nous',
    icon: Info,
    exactUrl: false
  },
  {
    name: 'Vision',
    path: '/about-us',
    fragment: 'vision',
    description: 'Voir notre vision',
    icon: ChartNoAxesColumn,
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
