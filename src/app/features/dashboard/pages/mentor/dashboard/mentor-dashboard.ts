import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';
import { MentorProfileStore } from '../../../store/mentor-profile.store';
import { MentorDashboardStore } from '../../../store/mentor-dashboard.store';

@Component({
  selector: 'app-mentor-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './mentor-dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MentorDashboard implements OnInit {
  authStore = inject(AuthStore);
  profileStore = inject(MentorProfileStore);
  dashboardStore = inject(MentorDashboardStore);

  dashboardIcon = 'dashboard';
  profileIcon = 'person';
  sessionsIcon = 'event';
  requestsIcon = 'mail';
  menteesIcon = 'groups';
  ratingIcon = 'star';

  ngOnInit(): void {
    const user = this.authStore.user();
    if (user?.mentor_profile?.id) {
      this.profileStore.loadProfile(user.mentor_profile.id);
      this.dashboardStore.loadStats();
      this.dashboardStore.loadRecentActivity();
    }
  }
}
