import { Component, computed, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { LucideAngularModule, ChevronDown, Home } from 'lucide-angular';
import { DASHBOARD_LINKS, ILink } from '../../data/links.data';
import { filter } from 'rxjs';
import { AuthStore } from '../../../core/auth/auth.store';
import { ButtonModule } from 'primeng/button';
import { HasRoleDirective } from '../../../shared/directives/has-role.directive';

@Component({
  selector: 'app-dashboard-sidebar',
  imports: [CommonModule, ButtonModule, HasRoleDirective, RouterModule, LucideAngularModule],
  templateUrl: './dashboard-sidebar.component.html'
})
export class DashboardSidebarComponent {
  #router = inject(Router);
  style = input<string>();
  icons = { chevronDown: ChevronDown, home: Home };
  links = signal<ILink[]>(DASHBOARD_LINKS);
  currentUrl = signal(this.#router.url);
  toggleTab = signal<string | null>(null);
  authStore = inject(AuthStore);
  activeTab = computed(() => {
    const url = this.currentUrl();
    return (
      this.links().find((link) => link.path === url || link.children?.some((child) => url.startsWith(child.path)))
        ?.name ?? null
    );
  });

  constructor() {
    this.#router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.currentUrl.set(event.urlAfterRedirects);
    });
  }

  onToggleTab(name: string): void {
    const isOpen = this.toggleTab() === name;
    this.toggleTab.set(isOpen ? null : name);
  }

  isTabOpen(name: string): boolean {
    return this.activeTab() === name || this.toggleTab() === name;
  }
}
