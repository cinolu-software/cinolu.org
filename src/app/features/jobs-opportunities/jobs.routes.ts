export const jobsRoutes = [
  {
    path: '',
    title: 'Jobs',
    loadComponent: () => import('./pages/jobs-opportunities').then((m) => m.JobsOpportunities),
  },
];
