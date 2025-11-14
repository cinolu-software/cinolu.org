import { Menu, X, ChevronDown, ArrowLeft, ChevronRight, Minus, LayoutGrid, LogOut } from 'lucide-angular';

/**
 * Configuration centralisée des icônes Lucide pour la barre de navigation
 */
export const TOPBAR_ICONS = {
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,

  menu: Menu,
  close: X,
  arrowLeft: ArrowLeft,
  minus: Minus,

  dashboard: LayoutGrid,
  logOut: LogOut
} as const;

export const TOPBAR_ANIMATION = {
  mobileSubItemHeight: 48,
  mobileProgramItemHeight: 64,
  scrollThreshold: 20
} as const;
