import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { mentorGuard } from '@core/guards/mentor.guard';

export const dashboardMentorRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard, mentorGuard],
    loadComponent: () =>
      import('./components/mentor-dashboard-layout/mentor-dashboard-layout').then((c) => c.MentorDashboardLayout),
    children: [
      {
        path: '',
        title: 'Dashboard Mentor',
        loadComponent: () =>
          import('../dashboard/pages/mentor/dashboard/mentor-dashboard').then((c) => c.MentorDashboard)
      },
      {
        path: 'profile',
        title: 'Profil Mentor',
        loadComponent: () =>
          import('../dashboard/pages/mentor/profile/mentor-profile').then((c) => c.MentorProfile)
      }
    ]
  }
];
