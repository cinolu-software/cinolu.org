export const entrepreneursRoutes = [
  {
    path: '',
    title: 'Entrepreneurs',
    loadComponent: () =>
      import('./pages/our-entrepreneurs').then((c) => c.OurEntrepreneurs),
  },
  {
    path: ':email',
    title: 'Entrepreneur - Details',
    loadComponent: () =>
      import('./components/company-detail-card/company-detail-card').then(
        (c) => c.CompanyDetailCard,
      ),
  },
];
