import { Routes } from '@angular/router';

export const signUpRoutes: Routes = [
  {
    path: 'sign-up',
    title: 'Sign Up',
    loadComponent: () => import('./sign-up.component').then((c) => c.AuthSignUpComponent)
  }
];
