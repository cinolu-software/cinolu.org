import { Component, inject, OnInit, ChangeDetectionStrategy, effect } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';
import { MentorDashboardStore } from '../../../store/mentor-dashboard.store';
import { MentorProfileStore } from '../../../store/mentor-profile.store';

@Component({
  selector: 'app-mentor-dashboard',
  imports: [RouterModule],
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

  constructor() {
    // Charger le profil mentor quand l'utilisateur change
    effect(() => {
      const user = this.authStore.user();
      if (user?.mentor_profile) {
        this.profileStore.loadProfileFromAuth();
      }
    });
  }

  ngOnInit(): void {
    this.dashboardStore.loadStats();
  }
}
