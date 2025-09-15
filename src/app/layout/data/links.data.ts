import {
  LucideIconData,
  Info,
  Activity,
  UserCheck,
  BriefcaseBusiness,
  Calendar1,
  Phone,
  House,
  LayoutGrid,
  BookOpen,
  Group,
  Users,
  Briefcase,
  FlaskConical,
  Sparkles,
  GraduationCap,
  Youtube,
  Image,
  Layers,
  Folders,
} from 'lucide-angular';

export interface ILink {
  name: string;
  external?: boolean;
  description?: string;
  fragment?: string;
  icon?: LucideIconData;
  path?: string;
  exactUrl?: boolean;
  children?: ILink[];
}

export const EXPLORATION_LINKS: ILink[] = [
  {
    icon: House,
    name: 'Accueil',
    path: '/',
    exactUrl: true,
  },
  {
    icon: Activity,
    name: 'Programmes',
    path: '/programs',
  },
  {
    icon: Calendar1,
    name: 'Evénements',
    path: '/events',
  },
  {
    icon: Info,
    name: 'A propos',
    path: '/about-us',
  },
  {
    icon: Phone,
    name: 'Contact',
    path: '/contact-us',
  },
  {
    icon: BookOpen,
    name: 'Blog',
    path: '/blog-ressources',
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

export const EXPLORATION_LINK: ILink[] = [
  {
    icon: House,
    name: 'Accueil',
    path: '/',
    exactUrl: true,
  },
  {
    icon: Activity,
    name: 'Programmes',
    path: '/programs',
    children: [
      {
        name: 'Genre & Inclusion',
        children: [
          {
            name: 'F360 Hub',
            path: '/programs/genre-inclusion/f360',
            icon: Users,
            children: [
              {
                name: 'Binti Bora',
                path: '/programs/genre-inclusion/f360/binti-bora',
              },
              {
                name: 'Binti Safari',
                path: '/programs/genre-inclusion/f360/binti-safari',
              },
              {
                name: 'F360 Capacity Building',
                path: '/programs/genre-inclusion/f360/capacity-building',
              },
              {
                name: 'F360 Incubates',
                path: '/programs/genre-inclusion/f360/incubates',
              },
            ],
          },
        ],
      },
      {
        name: 'Entreprenariat & Employabilité',
        children: [
          {
            name: 'Ushindi Hub',
            path: '/programs/entrepreneurship/ushindi',
            icon: Briefcase,
            children: [
              {
                name: 'UCampus Sprint',
                path: '/programs/entrepreneurship/ushindi/ucampus-sprint',
              },
              {
                name: 'L’Impact',
                path: '/programs/entrepreneurship/ushindi/limpact',
              },
            ],
          },
        ],
      },
      {
        name: 'Recherche & Innovation',
        children: [
          {
            name: 'Uvumbuzi Hub',
            path: '/programs/research/uvumbuzi',
            icon: FlaskConical,
          },
        ],
      },
      {
        name: 'Jeunesse & Créativité',
        children: [
          {
            name: 'Ushahidi Hub',
            path: '/programs/youth/ushahidi',
            icon: Sparkles,
          },
        ],
      },
      {
        name: 'Stages & Communautés',
        children: [
          {
            name: 'Fellowships',
            path: '/programs/fellowships',
            icon: GraduationCap,
            children: [
              {
                name: 'Cisco Networking Academy',
                path: '/programs/fellowships/cisco',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    icon: Calendar1,
    name: 'Évènements',
    path: '/events',
  },
  {
    icon: Info,
    name: 'My Cinolu',
    path: '/mycinolu',
    children: [
      { name: 'OneStop Platform', path: '/mycinolu/onestop' },
      { name: 'À propos', path: '/about-us' },
      { name: 'Jobs & Opportunités', path: '/jobs-opportunities' },
      { name: 'Contacts', path: '/contact-us', icon: Image },
      { name: 'Blog', path: '/blog-ressources', icon: BookOpen },
      {
        name: 'Youtube',
        path: 'https://youtube.com/@centredinnovationdelubumba3607?si=b8auRTD8fB60qJwI',
        external: true,
        icon: Youtube,
      },
      { name: 'Galerie', path: '/gallery', icon: Image },
    ],
  },
];

export const ADMIN_LINKS: ILink[] = [
  {
    name: 'Les programmes',
    path: '/dashboard/list-programs',
    icon: Layers,
    children: [
      {
        name: 'Tous les programmes',
        path: '/dashboard/programs',
      },
      {
        name: 'Catégories',
        path: '/dashboard/program-categories',
      },
      {
        name: 'Sous programmes',
        path: '/dashboard/subprograms',
      },
    ],
  },
  {
    name: 'Les projets',
    path: '/dashboard/list-programs',
    icon: Folders,
    children: [
      {
        name: 'Tous les projets',
        path: '/dashboard/projects',
      },
      {
        name: 'Catégories',
        path: '/dashboard/project-categories',
      },
    ],
  },
  {
    name: 'Les événements',
    path: '/dashboard/list-programs',
    icon: Calendar1,
    children: [
      {
        name: 'Tous les événements',
        path: '/dashboard/events',
      },
      {
        name: 'Catégories',
        path: '/dashboard/event-categories',
      },
    ],
  },
  {
    name: 'Le blog',
    path: '/dashboard/blog',
    icon: BookOpen,
    children: [
      {
        name: 'Articles',
        path: '/dashboard/blog/articles',
      },
      {
        name: 'Tags',
        path: '/dashboard/blog/tags',
      },
    ],
  },
  {
    name: 'Les utilisateurs',
    path: '/dashboard/users',
    icon: UserCheck,
    children: [
      {
        name: 'Liste',
        path: '/dashboard/users',
      },
      {
        name: 'Rôles',
        path: '/dashboard/roles',
      },
    ],
  },
];

export const COMMON_LINKS: ILink[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: LayoutGrid,
    exactUrl: true,
  },
  {
    name: 'Mes informations',
    path: '/dashboard/account',
    icon: Info,
    exactUrl: true,
  },
];

export const USER_LINKS: ILink[] = [
  {
    name: 'Mes entreprises',
    path: '/dashboard/ventures',
    icon: BriefcaseBusiness,
  },
  {
    name: 'Communauté',
    path: '/dashboard/community',
    icon: Group,
    children: [
      {
        name: 'Vulgarisation',
        path: '/dashboard/community/outreach',
      },
    ],
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
