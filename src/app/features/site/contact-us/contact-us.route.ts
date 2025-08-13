import { Routes } from '@angular/router';

export const contactUsRoutes: Routes = [
  {
    path: '',
    title: 'Contact-Us',
    loadComponent: () =>
      import('./pages/contact-us').then((c) => c.ContactUs),
  },
];
