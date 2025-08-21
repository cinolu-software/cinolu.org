import { Routes } from '@angular/router';

export const programsRoutes: Routes = [
  {
    path: ':slug',
    title: 'Details du programmes',
    loadComponent: () =>
      import('./pages/detail-programs/detail-programs').then(
        (c) => c.DetailPrograms,
      ),
  },
  // {
  //   path: ':slug',
  //   title: 'Events - Details',
  //   loadComponent: () =>
  //     import('./pages/detail-event/detail-event').then(
  //       (c) => c.DetailEvent,
  //     ),
  // },
];
