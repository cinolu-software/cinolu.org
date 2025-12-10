import { Routes } from '@angular/router';

export const faqRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/faq-page').then((m) => m.FaqPage),
    title: 'FAQ - Cinolu'
  }
];
