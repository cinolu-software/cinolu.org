import { Component, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthStore } from '../../store/auth.store';
import { PROFILE_LINKS } from '../../utils/data/links';

@Component({
  selector: 'app-dashboard-sidebar',
  imports: [CommonModule, NgOptimizedImage, RouterModule, LucideAngularModule],
  templateUrl: './dashboard-sidebar.component.html',
})
export class DashboardSidebarComponent {
  links = signal(PROFILE_LINKS);
  activeTab = signal('Mon compte');
  authStore = inject(AuthStore);

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
  }

  logout(): void {
    this.authStore.signOut();
  }
}
