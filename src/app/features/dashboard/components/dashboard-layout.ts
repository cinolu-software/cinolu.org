import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';
import { filter } from 'rxjs';
import { ApiImgPipe } from '@shared/pipes';
import { BackButton } from "@shared/components";

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, ApiImgPipe, NgOptimizedImage, BackButton],
  templateUrl: './dashboard-layout.html'
})
export class DashboardLayout implements OnInit {
  authStore = inject(AuthStore);
  router = inject(Router);

  isSidebarOpen = signal(false);
  currentRoute = signal('');

  menuItems = [
    {
      path: '/dashboard/overview',
      label: 'Accueil',
      icon: 'grid_view'
    },
    {
      path: '/dashboard/ventures',
      label: 'Entreprises',
      icon: 'business'
    },
    {
      path: '/dashboard/products',
      label: 'Produits',
      icon: 'inventory_2'
    },
    {
      path: '/dashboard/profile',
      label: 'Mon Profil',
      icon: 'person'
    },
    {
      path: '/dashboard/referrals',
      label: 'Parrainages',
      icon: 'group_add'
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
      '/dashboard/products': 'Catalogue Commercial',
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
