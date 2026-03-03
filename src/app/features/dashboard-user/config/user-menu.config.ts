import type { MenuItem, MenuSection } from '@features/dashboard/config/menu.config';

const USER_BASE = '/dashboard/user';

/** Menu fixe du dashboard user. Pas d’Espace Mentor ; lien admin géré dans le header. */
export const USER_MENU_CONFIG: MenuSection[] = [
  {
    title: "Vue d'ensemble",
    items: [
      {
        id: 'overview',
        label: 'Accueil',
        icon: 'dashboard',
        path: `${USER_BASE}/overview`,
        tooltip: 'Tableau de bord principal'
      }
    ]
  },
  {
    title: 'Mes Projets',
    items: [
      {
        id: 'entreprises',
        label: 'Mes Projets',
        icon: 'business_center',
        path: `${USER_BASE}/ventures`,
        tooltip: 'Accéder à Mes Projets et Produits'
      }
    ]
  },
  {
    title: 'Programmes',
    items: [
      {
        id: 'programs',
        label: 'Programmes',
        icon: 'school',
        children: [
          {
            id: 'programs-discover',
            label: 'Découvrir',
            icon: 'explore',
            path: `${USER_BASE}/programs/discover`,
            tooltip: 'Explorer les programmes disponibles'
          },
          {
            id: 'programs-applications',
            label: 'Mes candidatures',
            icon: 'folder_open',
            path: `${USER_BASE}/programs/my-applications`,
            tooltip: 'Suivre mes candidatures actives'
          },
          {
            id: 'programs-accepted',
            label: 'Programmes acceptés',
            icon: 'check_circle',
            path: `${USER_BASE}/programs/accepted`,
            tooltip: 'Accéder à mes programmes acceptés'
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
            path: `${USER_BASE}/referral/link`,
            tooltip: 'Générer et partager mon lien'
          },
          {
            id: 'referral-referred-users',
            label: 'Mes filleuls',
            icon: 'people',
            path: `${USER_BASE}/referral/referred-users`,
            tooltip: 'Voir mes utilisateurs référés'
          },
          {
            id: 'referral-badges',
            label: 'Badges & progression',
            icon: 'military_tech',
            path: `${USER_BASE}/referral/badges`,
            tooltip: 'Mes badges et niveaux'
          },
          {
            id: 'referral-activity',
            label: 'Activité récente',
            icon: 'history',
            path: `${USER_BASE}/referral/activity`,
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
            path: `${USER_BASE}/profile`,
            tooltip: 'Gérer mes informations personnelles'
          },
          {
            id: 'profile-security',
            label: 'Sécurité',
            icon: 'security',
            path: `${USER_BASE}/profile/security`,
            tooltip: 'Mot de passe et sécurité'
          },
          {
            id: 'profile-mentorship',
            label: 'Mentorat',
            icon: 'school',
            path: `${USER_BASE}/mentor/apply`,
            tooltip: 'Devenir mentor ou gérer ma candidature'
          }
        ]
      }
    ]
  }
];

export function isUserMenuActive(item: MenuItem, currentPath: string): boolean {
  if (item.path && currentPath === item.path) return true;
  if (item.id === 'entreprises') {
    return (
      currentPath.startsWith(`${USER_BASE}/ventures`) || currentPath.startsWith(`${USER_BASE}/products`)
    );
  }
  if (item.children) {
    return item.children.some((child) => isUserMenuActive(child, currentPath));
  }
  return false;
}
