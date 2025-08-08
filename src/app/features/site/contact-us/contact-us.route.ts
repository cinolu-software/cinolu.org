import { Routes } from '@angular/router';

export const contactUsRoutes: Routes = [
  {
    path: '',
    title: 'Contact-Us',
    loadComponent: () =>
      import('./pages/contact-us.component').then((c) => c.ContactUsComponent),
  },
];
