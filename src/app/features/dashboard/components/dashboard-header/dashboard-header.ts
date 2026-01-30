import { Component, input, output, signal, computed, ChangeDetectionStrategy, inject } from '@angular/core';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { AuthStore } from '@core/auth/auth.store';
import { ApiImgPipe } from '@shared/pipes';
import { IRole } from '@shared/models';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [NgClass, NgOptimizedImage, ApiImgPipe],
  templateUrl: './dashboard-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHeader {
  private authStore = inject(AuthStore);
  isMobile = input<boolean>(false);

  toggleSidebar = output<void>();
  toggleNotifications = output<void>();
  toggleUserMenu = output<void>();

  showNotifications = signal(false);
  showUserMenu = signal(false);
  searchQuery = signal('');

  user = computed(() => this.authStore.user());
  referralCode = computed(() => this.authStore.user()?.referral_code || 'N/A');

  notifications = signal([
 
    {
      id: 2,
      title: 'Parrainage réussi',
      message: 'Un nouveau membre a utilisé votre code',
      time: 'Il y a 5h',
      read: false,
      icon: 'group_add',
      color: 'text-emerald-600'
    }
  ]);

  unreadCount = computed(() => this.notifications().filter((n) => !n.read).length);

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
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  onNotificationClick(): void {
    this.showNotifications.update((v) => !v);
    this.showUserMenu.set(false);
  }

  onUserMenuClick(): void {
    this.showUserMenu.update((v) => !v);
    this.showNotifications.set(false);
  }

  markNotificationAsRead(id: number): void {
    this.notifications.update((notifications) => notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  markAllAsRead(): void {
    this.notifications.update((notifications) => notifications.map((n) => ({ ...n, read: true })));
  }

  signOut(): void {
    this.authStore.signOut();
  }
}
