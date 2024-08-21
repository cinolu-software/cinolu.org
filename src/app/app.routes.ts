import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    title: 'Home',
    component: LayoutComponent,
    data: {
      layout: 'empty'
    },
    children: [{ path: '', loadChildren: () => import('app/modules/landing/home/home.routes') }]
  },

  // Auth routes for guests
  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty'
    },
    children: [
      // {
      //   path: 'forgot-password',
      //   loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes')
      // },
      // { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes') },
      { path: 'sign-in', title: 'Sign In', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes') }
      // { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes') }
    ]
  },

  // Auth routes for authenticated users
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty'
    },
    children: [
      { path: 'sign-out', title: 'Sign Out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes') }
    ]
  },

  // Admin routes
  {
    path: '',

    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'futuristic'
    },
    resolve: {
      initialData: initialDataResolver
    },
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard',
        loadChildren: () => import('app/modules/admin/example/example.routes')
      }
    ]
  }
];
