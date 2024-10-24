import { Routes } from '@angular/router';

export const auhtRoutes: Routes = [
  {
    path: 'sign-up',
    title: 'Sign Up',
    loadComponent: () => import('./sign-up/sign-up.component').then((c) => c.AuthSignUpComponent)
  },
  {
    path: 'confirmation-required',
    title: 'Confirm Email',
    loadComponent: () =>
      import('./confirmation-required/confirmation-required.component').then((c) => c.AuthConfirmationRequiredComponent)
  },
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
    path: 'reset-password',
    title: 'Reset Password',
    loadComponent: () => import('./reset-password/reset-password.component').then((c) => c.AuthResetPasswordComponent)
  },
  {
    path: 'sign-out',
    title: 'Sign Out',
    loadComponent: () => import('./sign-out/sign-out.component').then((c) => c.AuthSignOutComponent)
  }
];
