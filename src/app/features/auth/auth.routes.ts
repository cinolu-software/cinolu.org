import { Routes } from '@angular/router';

export const authRoutes: Routes = [

  {
    path: 'sign-up',
    title: 'Sign Up',
    loadComponent: () => import('./pages/sign-up/sign-up').then((c) => c.SignUp),
  },
  {
    path: 'forgot-password',
    title: 'Forgot Password',
    loadComponent: () => import('./pages/forgot-password/forgot-password').then((c) => c.ForgotPassword),
  },
  {
    path: 'reset-password',
    title: 'Reset Password',
    loadComponent: () => import('./pages/reset-password/reset-password').then((c) => c.ResetPassword),
  },
];
