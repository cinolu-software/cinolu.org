import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LucideAngularModule, MoveLeft, ChevronDown } from 'lucide-angular';
import { DASHBOARD_LINKS } from '../../utils/data/links';

@Component({
  selector: 'app-dashboard-sidebar',
  imports: [CommonModule, NgOptimizedImage, RouterModule, LucideAngularModule],
  templateUrl: './dashboard-sidebar.component.html'
})
export class DashboardSidebarComponent implements OnInit {
  #route = inject(Router);
  links = signal(DASHBOARD_LINKS);
  icons = { chevronDown: ChevronDown, moveLeft: MoveLeft };
  activeTab = signal<string | null>(null);
  currentPath = this.#route.url.split('/')[2] || '';

  ngOnInit(): void {
    // this.activeTab.set(this.currentPath);
    // Get tab from the current route
    const name =
      this.links().find((link) => {
        return link.path.split('/')[2] === this.currentPath;
      })?.name || null;
    if (name) this.activeTab.set(name);
  }

  toggleTab(tab: string | null): void {
    console.log('Toggling tab:', tab);
    this.activeTab.set(tab);
  }
}
