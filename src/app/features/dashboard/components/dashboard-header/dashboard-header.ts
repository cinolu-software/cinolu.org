import { Component, input, output, signal, computed, ChangeDetectionStrategy, inject, OnDestroy } from '@angular/core';
import { CommonModule, NgClass, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';
import { ApiImgPipe } from '@shared/pipes';
import { IRole } from '@shared/models';

@Component({
  selector: 'app-dashboard-header',
  imports: [NgClass, NgOptimizedImage, ApiImgPipe, CommonModule, RouterLink],
  templateUrl: './dashboard-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHeader implements OnDestroy {
  private authStore = inject(AuthStore);
  isMobile = input<boolean>(false);

  toggleSidebar = output<void>();
  toggleUserMenu = output<void>();

  showUserMenu = signal(false);
  private clockTimer?: number;
  currentTime = signal(new Date());

  user = computed(() => this.authStore.user());
  referralCode = computed(() => this.authStore.user()?.referral_code || 'N/A');
  venturesCount = computed(() => {
    const user = this.authStore.user();
    if (user && 'venturesCount' in user) {
      const u = user as unknown as { venturesCount?: number };
      return (u.venturesCount ?? 0) as number;
    }
    return 0;
  });

  formattedTime = computed(() =>
    this.currentTime().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  );

  dateLabel = computed(() =>
    this.currentTime().toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  );

  shortTime = computed(() => this.currentTime().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));

  displayTime = computed(() => (this.isMobile && this.isMobile() ? this.shortTime() : this.formattedTime()));

  constructor() {
    if (typeof window !== 'undefined') {
      this.clockTimer = window.setInterval(() => this.currentTime.set(new Date()), 1000);
    }
  }

  getRoleLabel(): string {
    const user = this.user();
    if (!user || !user.roles) return 'Entrepreneur';
    if (user.roles.includes('mentor' as unknown as IRole)) return 'Mentor';
    return 'Entrepreneur';
  }

  getUserInitials(): string {
    const name = this.user()?.name || 'U';
    return name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  onUserMenuClick(): void {
    this.showUserMenu.update((v) => !v);
  }

  signOut(): void {
    this.authStore.signOut();
  }

  ngOnDestroy(): void {
    if (this.clockTimer !== undefined) {
      clearInterval(this.clockTimer);
      this.clockTimer = undefined;
    }
  }
}
