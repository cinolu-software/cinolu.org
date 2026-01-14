import { Component, inject, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';
import { MentorDashboardStore } from '../../../store/mentor-dashboard.store';
import { IUser } from '@shared/models';

@Component({
  selector: 'app-mentor-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './mentor-dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MentorDashboard implements OnInit {
  authStore = inject(AuthStore);
  profileStore = this.authStore.getProfile();
  dashboardStore = inject(MentorDashboardStore);
  user = signal<IUser | null>(null);

  dashboardIcon = 'dashboard';
  profileIcon = 'person';
  sessionsIcon = 'event';
  requestsIcon = 'mail';
  menteesIcon = 'groups';
  ratingIcon = 'star';

  ngOnInit(): void {
    this.user.set(this.authStore.user());
    console.log('Current user:', this.user());
    this.dashboardStore.loadStats();
  }
}
