import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: 'available-trainnings',
    title: 'Available Training',
    loadComponent: () =>
      import('./available-trainning/available-trainning.component').then((c) => c.AvailableTrainningComponent)
  },
  {
    path: 'calls',
    title: 'Calls',
    loadComponent: () => import('./calls/calls.component').then((c) => c.CallsComponent)
  },
  {
    path: 'coaching',
    title: 'Coaching',
    loadComponent: () => import('./coaching/coaching.component').then((c) => c.CoachingComponent)
  },
  {
    path: 'collaborations',
    title: 'Collaborations',
    loadComponent: () => import('./collaborations/collaborations.component').then((c) => c.CollaborationsComponent)
  },
  {
    path: 'history-training',
    title: 'History Training',
    loadComponent: () =>
      import('./history-trainning/history-trainning.component').then((c) => c.HistoryTrainningComponent)
  },
  {
    path: 'mentoring',
    title: 'Mentoring',
    loadComponent: () => import('./mentoring/mentoring.component').then((c) => c.MentoringComponent)
  },
  {
    path: 'my-account',
    title: 'My account',
    loadComponent: () => import('./my-account/my-account.component').then((c) => c.MyAccountComponent)
  },
  {
    path: 'my-enterprise',
    title: 'My entreprise',
    loadComponent: () => import('./my-enterprise/my-enterprise.component').then((c) => c.MyEnterpriseComponent)
  },
  {
    path: 'my-preferences',
    title: 'Preferences',
    loadComponent: () => import('./preferences/preferences.component').then((c) => c.PreferencesComponent)
  },
  {
    path: 'mentoring',
    title: 'Mentoring',
    loadComponent: () => import('./mentoring/mentoring.component').then((c) => c.MentoringComponent)
  },
  {
    path: 'programs',
    title: 'Programs',
    loadComponent: () => import('./programs/programs.component').then((c) => c.ProgramsComponent)
  },
  {
    path: 'projects',
    title: 'Projects',
    loadComponent: () => import('./projects/projects.component').then((c) => c.ProjectsComponent)
  },
  {
    path: 'submit-project',
    title: 'Submit Project',
    loadComponent: () => import('./submit-project/submit-project.component').then((c) => c.SubmitProjectComponent)
  }
];
