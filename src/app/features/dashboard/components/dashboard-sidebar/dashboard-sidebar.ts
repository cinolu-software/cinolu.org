import {
  Component,
  input,
  output,
  signal,
  computed,
  ChangeDetectionStrategy,
  inject,
  effect,
  DestroyRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';
import { filter } from 'rxjs';
import { AuthStore } from '@core/auth/auth.store';
import {
  DASHBOARD_MENU_CONFIG,
  MenuItem,
  filterMenuByRoles,
  isMenuActive
} from '@features/dashboard/config/menu.config';

@Component({
  selector: 'app-dashboard-sidebar',

  imports: [NgClass, RouterModule],
  templateUrl: './dashboard-sidebar.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardSidebar {
  private router = inject(Router);
  private authStore = inject(AuthStore);
  private destroyRef = inject(DestroyRef);

  // Inputs
  isCollapsed = input<boolean>(false);
  isMobile = input<boolean>(false);

  // Outputs
  closeSidebar = output<void>();
  navigate = output<string>();

  // State
  currentPath = signal<string>(this.router.url);
  expandedMenus = signal<Set<string>>(new Set());

  // Computed
  menuConfig = computed(() => {
    const userRoles = this.authStore.user()?.roles || [];
    return filterMenuByRoles(DASHBOARD_MENU_CONFIG, userRoles);
  });

  constructor() {
    // Track route changes
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.currentPath.set(event.url);
          this.autoExpandActiveMenus();
        }
      });

    // Auto-expand active menus on init
    effect(() => {
      this.autoExpandActiveMenus();
    });
  }

  /**
   * Auto-expand menus that contain the active route
   */
  private autoExpandActiveMenus(): void {
    const currentPath = this.currentPath();
    const expanded = new Set<string>();

    this.menuConfig().forEach((section) => {
      section.items.forEach((item) => {
        if (item.children && isMenuActive(item, currentPath)) {
          expanded.add(item.id);
        }
      });
    });

    this.expandedMenus.set(expanded);
  }

  /**
   * Toggle menu expansion
   */
  toggleMenu(menuId: string): void {
    const expanded = new Set(this.expandedMenus());
    if (expanded.has(menuId)) {
      expanded.delete(menuId);
    } else {
      expanded.add(menuId);
    }
    this.expandedMenus.set(expanded);
  }

  /**
   * Check if menu is expanded
   */
  isMenuExpanded(menuId: string): boolean {
    return this.expandedMenus().has(menuId);
  }

  /**
   * Check if menu item is active
   */
  isActive(item: MenuItem): boolean {
    return isMenuActive(item, this.currentPath());
  }

  /**
   * Check if child menu is active
   */
  isChildActive(child: MenuItem): boolean {
    return child.path ? this.currentPath() === child.path : false;
  }

  /**
   * Handle menu item click
   */
  onMenuClick(item: MenuItem, event?: MouseEvent): void {
    // Si le menu est désactivé, bloquer
    if (item.disabled) {
      event?.preventDefault();
      return;
    }

    // Si le menu a des enfants, toggle l'expansion
    if (item.children && item.children.length > 0) {
      event?.preventDefault();
      this.toggleMenu(item.id);
      return;
    }

    // Si le menu a un path, naviguer
    if (item.path) {
      this.navigate.emit(item.path);
      if (this.isMobile()) {
        this.closeSidebar.emit();
      }
    }
  }

  /**
   * Handle child menu click
   */
  onChildClick(child: MenuItem): void {
    if (child.disabled) return;

    if (child.path) {
      this.navigate.emit(child.path);
      if (this.isMobile()) {
        this.closeSidebar.emit();
      }
    }
  }

  /**
   * Handle keyboard navigation
   */
  onKeyDown(event: KeyboardEvent, item: MenuItem): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onMenuClick(item);
    }

    // Arrow navigation
    if (item.children && item.children.length > 0) {
      if (event.key === 'ArrowRight' && !this.isMenuExpanded(item.id)) {
        event.preventDefault();
        this.toggleMenu(item.id);
      }
      if (event.key === 'ArrowLeft' && this.isMenuExpanded(item.id)) {
        event.preventDefault();
        this.toggleMenu(item.id);
      }
    }
  }

  /**
   * Sign out
   */
  signOut(): void {
    this.authStore.signOut();
  }

  /**
   * Get badge color classes
   */
  getBadgeColorClass(color: 'primary' | 'success' | 'warning' | 'danger'): string {
    const colors = {
      primary: 'bg-primary-500 text-white',
      success: 'bg-emerald-500 text-white',
      warning: 'bg-amber-500 text-white',
      danger: 'bg-red-500 text-white'
    };
    return colors[color] || colors.primary;
  }
}
