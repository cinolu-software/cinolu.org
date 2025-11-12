export const entrepreneursRoutes = [
  {
    path: '',
    title: 'Entrepreneurs',
    loadComponent: () => import('./pages/our-entrepreneurs').then((c) => c.OurEntrepreneurs)
  },
  {
    path: ':slug',
    title: 'Entrepreneur - Details',
    loadComponent: () =>
      import('./components/entrepreneur-detail-card/entrepreneur-detail-card').then((c) => c.EntrepreneurDetailCard)
  },
  {
    path: 'venture/:slug',
    title: 'Venture - Details',
    loadComponent: () => import('./components/venture-card-detail/venture-card-detail').then((c) => c.VentureCardDetail)
  },
  {
    path: 'venture/:slug/:slug',
    title: 'Product - Details',
    loadComponent: () => import('./components/product-detail/product-detail').then((c) => c.ProductDetail)
  }
];
