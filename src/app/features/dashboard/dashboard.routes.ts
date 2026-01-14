import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { mentorGuard } from '@core/guards/mentor.guard';

export const dashboardRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./components/dashboard-layout').then((c) => c.DashboardLayout),
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        title: 'Tableau de bord',
        loadComponent: () => import('./pages/overview/overview').then((c) => c.DashboardOverview)
      },
      {
        path: 'ventures',
        title: 'Mes Entreprises',
        loadComponent: () => import('./pages/ventures/ventures-list/ventures-list').then((c) => c.VenturesUnified)
      },
      {
        path: 'ventures/create',
        title: 'Créer une Entreprise',
        loadComponent: () => import('./pages/ventures/venture-form/venture-form').then((c) => c.VentureForm)
      },
      {
        path: 'ventures/edit/:slug',
        title: 'Modifier une Entreprise',
        loadComponent: () => import('./pages/ventures/venture-form/venture-form').then((c) => c.VentureForm)
      },
      {
        path: 'ventures/:slug',
        title: "Détails de l'Entreprise",
        loadComponent: () => import('./pages/ventures/venture-details/venture-details').then((c) => c.VentureDetails)
      },
      {
        path: 'products/create',
        title: 'Créer un Produit',
        loadComponent: () => import('./pages/products/product-form/product-form').then((c) => c.ProductForm)
      },
      {
        path: 'products/edit/:slug',
        title: 'Modifier un Produit',
        loadComponent: () => import('./pages/products/product-form/product-form').then((c) => c.ProductForm)
      },
      {
        path: 'profile',
        title: 'Mon Profil',
        loadComponent: () => import('./pages/profile/profile').then((c) => c.ProfilePage)
      },
      {
        path: 'referrals',
        title: 'Parrainages',
        loadComponent: () => import('./pages/referrals/referrals').then((c) => c.ReferralsPage)
      },
      // Routes pour la candidature mentor
      {
        path: 'mentor/apply',
        title: 'Devenir Mentor',
        loadComponent: () => import('./pages/mentor/apply/mentor-apply').then((c) => c.MentorApply)
      },
      {
        path: 'mentor/application-pending',
        title: 'Candidature en attente',
        loadComponent: () =>
          import('./pages/mentor/application-pending/application-pending').then((c) => c.MentorApplicationPending)
      },
      {
        path: 'mentor/application-rejected',
        title: 'Candidature refusée',
        loadComponent: () =>
          import('./pages/mentor/application-rejected/application-rejected').then((c) => c.MentorApplicationRejected)
      },
      // Routes pour le dashboard mentor (protégées)
      {
        path: 'mentor',
        title: 'Dashboard Mentor',
        canActivate: [mentorGuard],
        loadComponent: () => import('./pages/mentor/dashboard/mentor-dashboard').then((c) => c.MentorDashboard)
      },
      {
        path: 'mentor/profile',
        title: 'Mon Profil Mentor',
        canActivate: [mentorGuard],
        loadComponent: () => import('./pages/mentor/profile/mentor-profile').then((c) => c.MentorProfile)
      }
    ]
  }
];
