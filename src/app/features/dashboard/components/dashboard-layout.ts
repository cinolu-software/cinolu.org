import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';
import { filter } from 'rxjs';
import { BackButton } from "@shared/components";

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, BackButton],
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
      icon: 'home'
    },
    {
      path: '/dashboard/ventures',
      label: 'Mes Ventures',
      icon: 'business'
    },
    {
      path: '/dashboard/products',
      label: 'Mes Produits',
      icon: 'shopping_bag'
    },
    {
      path: '/dashboard/profile',
      label: 'Profil',
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

  signOut() {
    this.authStore.signOut();
  }
}
