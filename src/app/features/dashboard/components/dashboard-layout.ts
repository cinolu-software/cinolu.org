import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';
import { filter } from 'rxjs';
import { ApiImgPipe } from '@shared/pipes';
import { BackButton } from '@shared/components';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, ApiImgPipe, NgOptimizedImage, BackButton],
  templateUrl: './dashboard-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardLayout implements OnInit {
  authStore = inject(AuthStore);
  router = inject(Router);

  isSidebarOpen = signal(false);
  currentRoute = signal('');

  navigationSections = [
    {
      title: 'Menu',
      items: [
        {
          path: '/dashboard/overview',
          label: 'Accueil',
          icon: 'dashboard',
          badge: null
        }
      ]
    },
    {
      title: 'Général',
      items: [
        {
          path: '/dashboard/ventures',
          label: 'Entreprises',
          icon: 'business_center',
          badge: null
        },
        {
          path: '/dashboard/profile',
          label: 'Mon Profil',
          icon: 'account_circle',
          badge: null
        },
        {
          path: '/dashboard/referrals',
          label: 'Parrainages',
          icon: 'group_add',
          badge: null
        }
      ]
    }
  ];

  quickActions = [
    {
      icon: 'add_business',
      label: 'Nouvelle entreprise',
      action: () => this.router.navigate(['/dashboard/ventures/create'])
    }
  ];

  ngOnInit() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute.set(event.url);
      }
    });

    this.currentRoute.set(this.router.url);
  }

  toggleSidebar() {
    this.isSidebarOpen.update((v) => !v);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }

  isActive(path: string): boolean {
    return this.currentRoute().startsWith(path);
  }

  getCurrentPageTitle(): string {
    const titles: Record<string, string> = {
      '/dashboard/overview': 'Accueil Dashboard',
      '/dashboard/ventures': 'Gestion des Entreprises',
      '/dashboard/profile': 'Mon Profil',
      '/dashboard/referrals': 'Mes Parrainages'
    };

    const route = this.currentRoute();
    for (const [path, title] of Object.entries(titles)) {
      if (route.startsWith(path)) return title;
    }
    return 'Dashboard';
  }

  signOut() {
    this.authStore.signOut();
  }
}
