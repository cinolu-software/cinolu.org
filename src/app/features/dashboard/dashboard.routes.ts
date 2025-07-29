import { Routes } from '@angular/router';
import { RoleEnum } from '../../core/auth/role.enum';
import { roleGuard } from '../../core/guards/role.guard';

export const dashboardRoutes: Routes = [
  {
    path: '',
    canActivate: [roleGuard],
    data: { requiredRole: RoleEnum.User },
    loadChildren: () => import('./account/account.routes').then((c) => c.accountRoutes)
  },
  {
    path: 'enterprises',
    canActivate: [roleGuard],
    data: { requiredRole: RoleEnum.User },
    loadChildren: () => import('./enterprises/enterprises.routes').then((c) => c.enterprisesRoutes)
  },
  {
    path: 'users',
    canActivate: [roleGuard],
    data: { requiredRole: RoleEnum.Staff },
    loadChildren: () => import('./users/users.routes').then((c) => c.usersRoutes)
  },
  {
    path: 'programs',
    canActivate: [roleGuard],
    data: { requiredRole: RoleEnum.Staff },
    loadChildren: () => import('./programs/programs.routes').then((c) => c.programsRoutes)
  },
  {
    path: 'projects',
    canActivate: [roleGuard],
    data: { requiredRole: RoleEnum.Staff },
    loadChildren: () => import('./projects/projects.routes').then((c) => c.projectsRoutes)
  },
  {
    path: 'events',
    canActivate: [roleGuard],
    data: { requiredRole: RoleEnum.Staff },
    loadChildren: () => import('./events/events.routes').then((c) => c.eventsRoutes)
  },
  {
    path: 'roles',
    canActivate: [roleGuard],
    data: { requiredRole: RoleEnum.Staff },
    loadChildren: () => import('./roles/roles.routes').then((c) => c.rolesRoutes)
  }
];
