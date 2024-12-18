import { Routes } from '@angular/router';

export const auhtRoutes: Routes = [
  {
    path: 'sign-up',
    title: 'Sign Up',
    loadComponent: () => import('./feature/sign-up/sign-up.component').then((c) => c.AuthSignUpComponent)
  },
  {
    path: 'confirmation-required',
    title: 'Confirm Email',
    loadComponent: () =>
      import('./feature/confirmation-required/confirmation-required.component').then(
        (c) => c.AuthConfirmationRequiredComponent
      )
  },
  {
    path: 'sign-in',
    title: 'Sign In',
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
