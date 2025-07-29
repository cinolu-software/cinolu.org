import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { LucideAngularModule, ChevronDown, Home } from 'lucide-angular';
import { DASHBOARD_LINKS, ILink } from '../../data/links.data';
import { filter } from 'rxjs';
import { RightsService } from '../../../core/auth/rights.service';
import { AuthStore } from '../../../core/auth/auth.store';
import { RolesEnum } from '../../../core/auth/roles.enum';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard-sidebar',
  imports: [CommonModule, ButtonModule, RouterModule, LucideAngularModule],
  templateUrl: './dashboard-sidebar.component.html'
})
export class DashboardSidebarComponent {
  #router = inject(Router);
  #rightsService = inject(RightsService);
  icons = { chevronDown: ChevronDown, home: Home };
  currentUrl = signal(this.#router.url);
  toggleTab = signal<string | null>(null);
  authStore = inject(AuthStore);
  activeTab = computed(() => {
    const url = this.currentUrl();
    return (
      DASHBOARD_LINKS.find((link) => link.path === url || link.children?.some((child) => url.startsWith(child.path)))
        ?.name ?? null
    );
  });

  constructor() {
    this.#router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.currentUrl.set(event.urlAfterRedirects);
    });
  }

  get visibleLinks(): ILink[] {
    const userRoles = this.authStore.user()?.roles || [];
    return DASHBOARD_LINKS.filter(
      (link) =>
        !link.role ||
        this.#rightsService.isAuthorized({
          currentRoles: userRoles as unknown as RolesEnum[],
          requiredRole: link.role as RolesEnum
        })
    );
  }

  onToggleTab(name: string): void {
    const isOpen = this.toggleTab() === name;
    this.toggleTab.set(isOpen ? null : name);
  }

  isTabOpen(name: string): boolean {
    return this.activeTab() === name || this.toggleTab() === name;
  }
}
