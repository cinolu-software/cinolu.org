import { Routes } from '@angular/router';
import { unauthGuard } from '../../core/guards/no-auth.guard';

export const authRoutes: Routes = [
  {
    path: 'sign-in',
    title: 'Sign In',
    canActivate: [unauthGuard],
    loadComponent: () => import('./pages/sign-in/sign-in.component').then((c) => c.AuthSignInComponent)
  },
  {
    path: 'sign-up',
    title: 'Sign Up',
    loadComponent: () => import('./pages/sign-up/sign-up.component').then((c) => c.AuthSignUpComponent)
  },
  {
    path: 'forgot-password',
    title: 'Forgot Password',
    loadComponent: () =>
      import('./pages/forgot-password/forgot-password.component').then((c) => c.AuthForgotPasswordComponent)
  },
  {
    path: 'reset-password',
    title: 'Reset Password',
    loadComponent: () =>
      import('./pages/reset-password/reset-password.component').then((c) => c.AuthResetPasswordComponent)
  }
];
