import { Routes } from '@angular/router';

export const profileRoutes: Routes = [
  {
    path: '',
    title: 'Profile',
    loadComponent: () => import('./feature/info/info.component').then((c) => c.ProfileInfoComponent),
  },
  {
    path: 'my-organizations',
    title: 'My Organizations',
    loadComponent: () =>
      import('./feature/my-organizations/my-organizations.component').then((c) => c.MyOrganizationsComponent),
  },
];
