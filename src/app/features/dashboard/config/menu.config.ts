import { IRole } from '@shared/models';

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path?: string;
  badge?: {
    count: number;
    color: 'primary' | 'success' | 'warning' | 'danger';
  };
  children?: MenuItem[];
  roles?: IRole[];
  isExternal?: boolean;
  disabled?: boolean;
  tooltip?: string;
}

export interface MenuSection {
  title?: string;
  items: MenuItem[];
}

export const DASHBOARD_MENU_CONFIG: MenuSection[] = [
  {
    title: "Vue d'ensemble",
    items: [
      {
        id: 'overview',
        label: 'Accueil',
        icon: 'dashboard',
        path: '/dashboard/overview',
        tooltip: 'Tableau de bord principal'
      }
    ]
  },

  {
    title: 'Entreprises',
    items: [
      {
        id: 'ventures',
        label: 'Mes Entreprises',
        icon: 'business_center',
        children: [
          {
            id: 'ventures-list',
            label: 'Mes entreprises',
            icon: 'list',
            path: '/dashboard/ventures',
            tooltip: 'Gérer mes entreprises'
          },
          {
            id: 'ventures-create',
            label: 'Créer une entreprise',
            icon: 'add_business',
            path: '/dashboard/ventures/create',
            tooltip: 'Ajouter une nouvelle entreprise'
          },
          {
            id: 'products-list',
            label: 'Mes produits',
            icon: 'inventory_2',
            path: '/dashboard/products',
            tooltip: 'Voir et gérer mes produits'
          },
          {
            id: 'products-create',
            label: 'Créer un produit',
            icon: 'add_shopping_cart',
            path: '/dashboard/products/create',
            tooltip: 'Ajouter un nouveau produit'
          }
        ]
      }
    ]
  },
  {
    title: 'Mentorat',
    items: [
      {
        id: 'mentor',
        label: 'Espace Mentor',
        icon: 'school',
        roles: ['mentor' as unknown as IRole],
        children: [
          {
            id: 'mentor-dashboard',
            label: 'Dashboard Mentor',
            icon: 'dashboard',
            path: '/dashboard/mentor',
            roles: ['mentor' as unknown as IRole],
            tooltip: 'Tableau de bord mentor'
          },
          {
            id: 'mentor-profile',
            label: 'Mon Profil Mentor',
            icon: 'badge',
            path: '/dashboard/mentor/profile',
            roles: ['mentor' as unknown as IRole],
            tooltip: 'Gérer mon profil de mentor'
          }
        ]
      }
    ]
  },
  {
    title: 'Communauté',
    items: [
      {
        id: 'referral',
        label: 'Parrainage',
        icon: 'card_giftcard',
        children: [
          {
            id: 'referral-link',
            label: 'Mon lien de parrainage',
            icon: 'link',
            path: '/dashboard/referral/link',
            tooltip: 'Générer et partager mon lien'
          },
          {
            id: 'referral-referred-users',
            label: 'Mes filleuls',
            icon: 'people',
            path: '/dashboard/referral/referred-users',
            tooltip: 'Voir mes utilisateurs référés'
          },
          {
            id: 'referral-badges',
            label: 'Badges & progression',
            icon: 'military_tech',
            path: '/dashboard/referral/badges',
            tooltip: 'Mes badges et niveaux'
          },
          {
            id: 'referral-activity',
            label: 'Activité récente',
            icon: 'history',
            path: '/dashboard/referral/activity',
            tooltip: 'Timeline de mes parrainages'
          }
        ]
      }
    ]
  },

  {
    title: 'Mon Compte',
    items: [
      {
        id: 'profile',
        label: 'Mon Profil',
        icon: 'account_circle',
        children: [
          {
            id: 'profile-info',
            label: 'Informations',
            icon: 'person',
            path: '/dashboard/profile',
            tooltip: 'Gérer mes informations personnelles'
          },
          {
            id: 'profile-security',
            label: 'Sécurité',
            icon: 'security',
            path: '/dashboard/profile/security',
            tooltip: 'Mot de passe et sécurité'
          },
          {
            id: 'profile-mentorship',
            label: 'Mentorat',
            icon: 'school',
            path: '/dashboard/mentor/apply',
            tooltip: 'Devenir mentor ou gérer ma candidature'
          }
        ]
      }
    ]
  }
];

export function filterMenuByRoles(menu: MenuSection[], userRoles: IRole[]): MenuSection[] {
  return menu
    .map((section) => ({
      ...section,
      items: section.items
        .filter((item) => !item.roles || item.roles.some((role) => userRoles.includes(role)))
        .map((item) => ({
          ...item,
          children: item.children
            ? item.children.filter((child) => !child.roles || child.roles.some((role) => userRoles.includes(role)))
            : undefined
        }))
        .filter((item) => !item.children || item.children.length > 0)
    }))
    .filter((section) => section.items.length > 0);
}

export function findMenuItemById(menu: MenuSection[], id: string): MenuItem | null {
  for (const section of menu) {
    for (const item of section.items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = item.children.find((child) => child.id === id);
        if (found) return found;
      }
    }
  }
  return null;
}

export function isMenuActive(item: MenuItem, currentPath: string): boolean {
  if (item.path && currentPath === item.path) {
    return true;
  }

  if (item.children) {
    return item.children.some((child) => isMenuActive(child, currentPath));
  }

  return false;
}
