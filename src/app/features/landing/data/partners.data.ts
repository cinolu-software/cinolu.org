export interface IPartner {
  name?: string;
  image: string;
  category: string;
}

interface ICategory {
  id: number;
  name: string;
}

export const PARTNERS: IPartner[] = [
  {
    name: 'Both of Us',
    image: '/images/partners/1.png',
    category: 'Institution',
  },
  {
    name: 'Buni',
    image: '/images/partners/2.png',
    category: 'Institution',
  },
  {
    name: 'Fondation Roi Baudouin',
    image: '/images/partners/3.png',
    category: 'Institutions & bailleurs',
  },
  {
    name: 'Giz',
    image: '/images/partners/4.jpg',
    category: 'Institutions & bailleurs',
  },
  {
    name: 'Impact Hub',
    image: '/images/partners/5.png',
    category: 'Institution',
  },
  {
    name: 'Akili RDC',
    image: '/images/partners/0.png',
    category: 'Hub',
  },
  {
    name: 'Eazy-Life',
    image: '/images/partners/6.png',
    category: 'Institution',
  },
  {
    name: 'Enabel',
    image: '/images/partners/7.png',
    category: 'Institutions & bailleurs',
  },
  {
    name: 'Institut Français',
    image: '/images/partners/8.jpg',
    category: 'Institution',
  },
  {
    name: 'F-360',
    image: '/images/partners/9.png',
    category: 'Institution',
  },
  {
    name: "L'etudiant entrepreneur",
    image: '/images/partners/10.png',
    category: 'Institution',
  },
  {
    name: 'BOTH US',
    image: '/images/partners/11.png',
    category: 'Institution',
  },
  {
    name: 'Luba Consulting',
    image: '/images/partners/12.jpg',
    category: 'Institution',
  },
  {
    name: 'Privilege Access',
    image: '/images/partners/13.jpeg',
    category: 'Institution',
  },
  {
    name: 'Ecam',
    image: '/images/partners/14.jpeg',
    category: 'Institution',
  },
  {
    name: 'PNUD',
    image: '/images/partners/15.png',
    category: 'Institution',
  },
  {
    name: 'Segal',
    image: '/images/partners/16.jpg',
    category: 'Institution',
  },
  {
    name: 'Sopa',
    image: '/images/partners/17.jpeg',
    category: 'Institution',
  },
  {
    name: 'ItotAfrica',
    image: '/images/partners/18.png',
    category: 'Institution',
  },
  {
    name: 'USAID',
    image: '/images/partners/19.png',
    category: 'Institutions & bailleurs',
  },
  {
    name: 'BOTH US',
    image: '/images/partners/20.jpeg',
    category: 'Institution',
  },
  {
    name: 'Waza',
    image: '/images/partners/21.jpg',
    category: 'Institution',
  },
  {
    name: 'Cina',
    image: '/images/partners/23.jpeg',
    category: 'Institution',
  },

  {
    name: 'Afrix Global',
    image: '/images/partners/24.jpeg',
    category: 'Institution',
  },
  {
    name: 'Katanga Entrepreneur',
    image: '/images/partners/25.jpeg',
    category: 'Institution',
  },
  {
    name: 'EDOU',
    image: '/images/partners/26.jpeg',
    category: 'Institution',
  },
  {
    name: 'Impact Hub',
    image: '/images/partners/27.jpeg',
    category: 'Institution',
  },
  {
    name: 'Ukamili Hub',
    image: '/images/partners/28.png',
    category: 'Hubs & réseaux africains',
  },
  {
    name: 'AfriLab',
    image: '/images/partners/29.png',
    category: 'Hubs & réseaux africains',
  },
  {
    name: "Afric'innov",
    image: '/images/partners/30.png',
    category: 'Institution',
  },
  {
    name: 'Ovation Hub',
    image: '/images/partners/13.png',
    category: 'Entreprises & banques',
  },
  {
    name: 'Bridge for Billions',
    image: '/images/partners/32.png',
    category: 'Hubs & réseaux africains',
  },
  {
    name: 'Startups Sans Frontières',
    image: '/images/partners/33.webp',
    category: 'Entreprises & banques',
  },
  {
    name: 'Union Europeenne',
    image: '/images/partners/35.png',
    category: 'Institutions & bailleurs',
  },
  {
    name: 'i4Policy',
    image: '/images/partners/36.jpg',
    category: 'Associations & communautés',
  },
  {
    name: 'CRDB',
    image: '/images/partners/37.png',
    category: 'Entreprises & banques',
  },
  {
    name: 'Ingenious City',
    image: '/images/partners/38.png',
    category: 'Hubs & réseaux africains',
  },
  {
    name: 'SADC Connect',
    image: '/images/partners/39.png',
    category: 'Associations & communautés',
  },
  {
    name: 'Silikin Village',
    image: '/images/partners/40.png',
    category: 'Hubs & réseaux africains',
  },
  {
    name: 'Startups Sans Frontières',
    image: '/images/partners/41.png',
    category: 'Institution',
  },
  {
    name: 'TechDev RDC',
    image: '/images/partners/42.png',
    category: 'Associations & communautés',
  },
  {
    name: 'UNILU',
    image: '/images/partners/43.png',
    category: 'Universités & écoles',
  },
  {
    name: 'ESIS Salama',
    image: '/images/partners/44.png',
    category: 'Universités & écoles',
  },
];

export const PARTNERS_CATEGORIES: ICategory[] = [
  {
    id: 0,
    name: 'Tous les partenaires',
  },
  {
    id: 1,
    name: 'Institution & bailleurs',
  },
  {
    id: 2,
    name: 'Entreprises & banques',
  },
  {
    id: 3,
    name: 'Universités & écoles',
  },
  {
    id: 4,
    name: 'Hubs & réseaux africains',
  },
  {
    id: 5,
    name: 'Associations & communautés',
  },
];
