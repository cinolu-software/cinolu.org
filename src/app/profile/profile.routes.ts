import { Routes } from '@angular/router';

export const profileRoutes: Routes = [
  {
    path: '',
    title: 'Profile',
    loadComponent: () => import('./feature/info/info.component').then((c) => c.ProfileInfoComponent)
  },
  {
    path: 'enterprises',
    title: 'Mes entreprises',
    loadComponent: () =>
      import('./feature/enterprises/enterprises.component').then((c) => c.ProfileEnterprisesComponent)
  }
];
