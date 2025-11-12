import { Menu, X, ChevronDown, ArrowLeft, ChevronRight, Minus, LayoutGrid, LogOut } from 'lucide-angular';

/**
 * Configuration centralisée des icônes Lucide pour la barre de navigation
 */
export const TOPBAR_ICONS = {
  // Icônes communes
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,

  // Icônes mobiles
  menu: Menu,
  close: X,
  arrowLeft: ArrowLeft,
  minus: Minus,

  // Icônes desktop
  dashboard: LayoutGrid,
  logOut: LogOut
} as const;

/**
 * Configuration des hauteurs pour les animations
 */
export const TOPBAR_ANIMATION = {
  mobileSubItemHeight: 48,
  mobileProgramItemHeight: 64,
  scrollThreshold: 20
} as const;
