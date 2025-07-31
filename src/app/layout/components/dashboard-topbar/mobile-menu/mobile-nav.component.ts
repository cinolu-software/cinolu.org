import { Component, computed, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { LucideAngularModule, Home, Menu, X, ChevronDown } from 'lucide-angular';
import { DASHBOARD_LINKS, ILink } from '../../../data/links.data';
import { IUser } from '../../../../shared/models/entities.models';
import { filter } from 'rxjs';
import { AuthStore } from '../../../../core/auth/auth.store';
import { HasRoleDirective } from '../../../../shared/directives/has-role.directive';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  imports: [LucideAngularModule, HasRoleDirective, RouterModule, CommonModule]
})
export class MobileNavComponent {
  user = input.required<IUser | null>();
  signOut = output<void>();
  isOpen = signal<boolean>(false);
  icons = { menu: Menu, close: X, home: Home, chevronDown: ChevronDown };
  #router = inject(Router);
  style = input<string>();
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

  toggleNav(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

  handleSignOut(): void {
    this.signOut.emit();
  }

  closeNav(): void {
    this.isOpen.set(false);
  }
}
