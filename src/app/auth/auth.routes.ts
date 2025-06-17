import { Routes } from '@angular/router';
import { unauthGuard } from '../shared/guards/no-auth.guard';

export const auhtRoutes: Routes = [
  {
    path: 'sign-in',
    title: 'Sign In',
    canActivate: [unauthGuard],
    loadComponent: () => import('./feature/sign-in/sign-in.component').then((c) => c.AuthSignInComponent)
  },
  {
    path: 'forgot-password',
    title: 'Forgot Password',
    loadComponent: () =>
      import('./feature/forgot-password/forgot-password.component').then((c) => c.AuthForgotPasswordComponent)
  },
  {
    path: 'reset-password',
    title: 'Reset Password',
    loadComponent: () =>
      import('./feature/reset-password/reset-password.component').then((c) => c.AuthResetPasswordComponent)
  }
];
