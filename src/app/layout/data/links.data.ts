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
import { RolesEnum } from '../../core/auth/roles.enum';

export interface ILink {
  name: string;
  external?: boolean;
  description?: string;
  fragment?: string;
  icon?: LucideIconData;
  path: string;
  exactUrl?: boolean;
  role?: string;
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
  },
  {
    name: 'Contact',
    path: '/contact-us'
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
    role: RolesEnum.User,
    exactUrl: true
  },
  {
    name: 'Mes enteprises',
    path: '/dashboard/enterprises',
    role: RolesEnum.User,
    icon: BriefcaseBusiness
  },
  {
    name: 'Les utilisateurs',
    path: '/dashboard/users',
    role: RolesEnum.Staff,
    icon: UserCheck
  },
  {
    name: 'Les programmes',
    path: '/dashboard/programs',
    role: RolesEnum.Staff,
    icon: Activity
  },
  {
    name: 'Les projets',
    path: '/dashboard/projects',
    icon: Briefcase,
    role: RolesEnum.Staff,
    children: [
      {
        name: 'Liste',
        path: '/dashboard/projects/list'
      },
      {
        name: 'Catégories',
        path: '/dashboard/projects/categories'
      }
    ]
  },
  {
    name: 'Les événements',
    path: '/dashboard/events',
    icon: Calendar1,
    role: RolesEnum.Staff,
    children: [
      {
        name: 'Liste ',
        path: '/dashboard/events/list'
      },
      {
        name: 'Catégories',
        path: '/dashboard/events/categories'
      }
    ]
  },
  {
    name: 'Les rôles',
    path: '/dashboard/roles',
    role: RolesEnum.Staff,
    icon: Columns3Cog
  }
];

export const SOCIAL_LINKS: ILink[] = [
  { name: 'Facebook', path: 'https://www.facebook.com/share/15cR36qNs8/?mibextid=kFxxJD', external: true },
  { name: 'Twitter', path: 'https://x.com/Lubumdigital?t=MYcaQ_OEdCO3KZDCQzMoeQ&s=09', external: true },
  { name: 'LinkedIn', path: 'https://www.linkedin.com/company/cinolu/', external: true }
];
