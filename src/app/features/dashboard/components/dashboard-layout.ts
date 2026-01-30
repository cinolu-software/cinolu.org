import { Component, inject, signal, OnInit, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { BackButton } from '@shared/components';
import { DashboardSidebar } from './dashboard-sidebar/dashboard-sidebar';
import { DashboardHeader } from './dashboard-header/dashboard-header';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterModule, BackButton, DashboardSidebar, DashboardHeader],
  templateUrl: './dashboard-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardLayout implements OnInit {
  private router = inject(Router);

  isSidebarCollapsed = signal(false);
  isMobileSidebarOpen = signal(false);
  isMobile = signal(false);

  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    this.isMobile.set(window.innerWidth < 1024);
  }

  toggleSidebar(): void {
    if (this.isMobile()) {
      this.isMobileSidebarOpen.update((v) => !v);
    } else {
      this.isSidebarCollapsed.update((v) => !v);
    }
  }

  closeMobileSidebar(): void {
    this.isMobileSidebarOpen.set(false);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
