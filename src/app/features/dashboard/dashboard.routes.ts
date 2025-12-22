import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
// import { userGuard } from '@core/guards/role.guard';

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
        title: 'Mes Ventures',
        loadComponent: () => import('./pages/ventures/ventures-list/ventures-list').then((c) => c.VenturesList)
      },
      {
        path: 'ventures/create',
        title: 'Créer une Venture',
        loadComponent: () => import('./pages/ventures/venture-form/venture-form').then((c) => c.VentureForm)
      },
      {
        path: 'ventures/edit/:slug',
        title: 'Modifier une Venture',
        loadComponent: () => import('./pages/ventures/venture-form/venture-form').then((c) => c.VentureForm)
      },
      {
        path: 'ventures/:slug',
        title: 'Détails de la Venture',
        loadComponent: () => import('./pages/ventures/venture-details/venture-details').then((c) => c.VentureDetails)
      },
      {
        path: 'products',
        title: 'Mes Produits',
        loadComponent: () => import('./pages/products/products-list/products-list').then((c) => c.ProductsList)
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
      }
    ]
  }
];
