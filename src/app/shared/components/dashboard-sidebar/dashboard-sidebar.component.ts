import { Component, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, MoveLeft, ChevronDown } from 'lucide-angular';
import { DASHBOARD_LINKS } from '../../utils/data/links';

@Component({
  selector: 'app-dashboard-sidebar',
  imports: [CommonModule, NgOptimizedImage, RouterModule, LucideAngularModule],
  templateUrl: './dashboard-sidebar.component.html'
})
export class DashboardSidebarComponent {
  links = signal(DASHBOARD_LINKS);
  icons = { chevronDown: ChevronDown, moveLeft: MoveLeft };
  activeTab = signal<string | null>(null);

  toggleTab(tab: string | null): void {
    this.activeTab.update((currentTab) => (tab === currentTab ? null : tab));
  }
}
