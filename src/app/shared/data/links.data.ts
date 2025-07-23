import {
  LucideIconData,
  Info,
  Activity,
  UserCheck,
  BriefcaseBusiness,
  Briefcase,
  Calendar1,
  Columns3Cog
} from 'lucide-angular';

export interface ILink {
  name: string;
  external?: boolean;
  description?: string;
  fragment?: string;
  icon?: LucideIconData;
  path: string;
  exactUrl?: boolean;
  children?: ILink[];
}
export const EXPLORATION_LINKS: ILink[] = [
  {
    name: 'Accueil',
    path: '/',
    exactUrl: true
  },
  {
    name: 'Programmes',
    path: '/programs'
  },
  {
    name: 'Evénements',
    path: '/events'
  },
  {
    name: 'A propos',
    path: '/about-us'
  }
];

export const MY_CINOLU_LINKS: ILink[] = [
  {
    name: 'A propos',
    path: '/about-us',
    fragment: 'about'
  },
  {
    name: 'Vision',
    path: '/about-us',
    fragment: 'vision'
  }
];

export const DASHBOARD_LINKS: ILink[] = [
  {
    name: 'Mes informations',
    path: '/dashboard',
    icon: Info,
    exactUrl: true
  },
  {
    name: 'Mes enteprises',
    path: '/dashboard/enterprises',
    icon: BriefcaseBusiness
  },
  {
    name: 'Les utilisateurs',
    path: '/dashboard/users',
    icon: UserCheck
  },
  {
    name: 'Les programmes',
    path: '/dashboard/programs',
    icon: Activity
  },
  {
    name: 'Les projets',
    path: '/dashboard/projects',
    icon: Briefcase,
    children: [
      {
        name: 'Liste',
        path: '/dashboard/projects'
      },
      {
        name: 'Catégories',
        path: '/dashboard/project-categories'
      }
    ]
  },
  {
    name: 'Les événements',
    path: '/dashboard/events',
    fragment: 'info',
    icon: Calendar1,
    children: [
      {
        name: 'Liste ',
        path: '/dashboard/events'
      },
      {
        name: 'Catégories',
        path: '/dashboard/event-categories'
      }
    ]
  },
  {
    name: 'Les rôles',
    path: '/dashboard/roles',
    icon: Columns3Cog
  }
];

export const SOCIAL_LINKS: ILink[] = [
  { name: 'Facebook', path: 'https://www.facebook.com/share/15cR36qNs8/?mibextid=kFxxJD', external: true },
  { name: 'Twitter', path: 'https://x.com/Lubumdigital?t=MYcaQ_OEdCO3KZDCQzMoeQ&s=09', external: true },
  { name: 'LinkedIn', path: 'https://www.linkedin.com/company/cinolu/', external: true }
];
