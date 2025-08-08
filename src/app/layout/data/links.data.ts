import {
  LucideIconData,
  Info,
  Activity,
  UserCheck,
  BriefcaseBusiness,
  Briefcase,
  Calendar1,
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
    exactUrl: true,
  },
  {
    name: 'Programmes',
    path: '/programs',
  },
  {
    name: 'Evénements',
    path: '/events',
  },
  {
    name: 'A propos',
    path: '/about-us',
  },
  {
    name: 'Contact',
    path: '/contact-us',
  },
];

export const MY_CINOLU_LINKS: ILink[] = [
  {
    name: 'A propos',
    path: '/about-us',
    fragment: 'about',
  },
  {
    name: 'Vision',
    path: '/about-us',
    fragment: 'vision',
  },
];

export const ADMIN_LINKS: ILink[] = [
  {
    name: 'Les programmes',
    path: '/dashboard/programs',
    icon: Activity,
  },
  {
    name: 'Les utilisateurs',
    path: '/dashboard/users',
    icon: UserCheck,
    children: [
      {
        name: 'Liste',
        path: '/dashboard/users/list',
      },
      {
        name: 'Rôles',
        path: '/dashboard/users/roles',
      },
    ],
  },
  {
    name: 'Les projets',
    path: '/dashboard/projects',
    icon: Briefcase,
    children: [
      {
        name: 'Liste',
        path: '/dashboard/projects/list',
      },
      {
        name: 'Catégories',
        path: '/dashboard/projects/categories',
      },
    ],
  },
  {
    name: 'Les événements',
    path: '/dashboard/events',
    icon: Calendar1,
    children: [
      {
        name: 'Liste ',
        path: '/dashboard/events/list',
      },
      {
        name: 'Catégories',
        path: '/dashboard/events/categories',
      },
    ],
  },
];

export const COMMON_LINKS: ILink[] = [
  {
    name: 'Mes informations',
    path: '/dashboard',
    icon: Info,
    exactUrl: true,
  },
];

export const USER_LINKS: ILink[] = [
  {
    name: 'Mes entreprises',
    path: '/dashboard/ventures/list',
    icon: BriefcaseBusiness,
  },
];

export const SOCIAL_LINKS: ILink[] = [
  {
    name: 'Facebook',
    path: 'https://www.facebook.com/share/15cR36qNs8/?mibextid=kFxxJD',
    external: true,
  },
  {
    name: 'Twitter',
    path: 'https://x.com/Lubumdigital?t=MYcaQ_OEdCO3KZDCQzMoeQ&s=09',
    external: true,
  },
  {
    name: 'LinkedIn',
    path: 'https://www.linkedin.com/company/cinolu/',
    external: true,
  },
];
