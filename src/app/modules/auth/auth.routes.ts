import { Route } from '@angular/router';

export const auhtRoutes: Route[] = [
  {
    path: 'sign-in',
    title: 'Sign In',
    loadComponent: () => import('./sign-in/sign-in.component').then((c) => c.AuthSignInComponent)
  },
  {
    path: 'forgot-password',
    title: 'Forgot Password',
    loadComponent: () =>
      import('./forgot-password/forgot-password.component').then((c) => c.AuthForgotPasswordComponent)
  },
  {
    path: 'sign-out',
    title: 'Sign out',
    loadComponent: () => import('./sign-out/sign-out.component').then((c) => c.AuthSignOutComponent)
  }
];
