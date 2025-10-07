interface IProduct {
  id: number;
  name: string;
  image: string;
  logo?: string;
  description: string;
  price?: string;
  link: string;
}

interface ISocials {
  website?: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
  github?: string;
  discord?: string;
  email?: string;
}

export interface IEntrepreneur {
  id: number;
  name: string;
  photo: string;
  title: string;
  bio: string;
  location: string;
  category: string;
  socials: ISocials[];
  products: IProduct[];
}

export const ENTREPRENEURS_DATA: IEntrepreneur[] = [
  {
    id: 1,
    name: 'Sarah Kabeya',
    photo: 'https://picsum.photos/seed/sarah/300/300',
    title: 'Fondatrice de AfriTech',
    bio: 'Entrepreneure congolaise spécialisée dans les solutions numériques locales.',
    location: 'Kinshasa, RDC',
    category: 'Technologie',
    socials: [
      {
        website: 'https://afritech.cd',
      },
      { linkedin: 'https://linkedin.com/in/sarahkabeya' },
    ],
    products: [
      {
        id: 101,
        name: 'Plateforme e-learning AfriTech',
        image: 'https://picsum.photos/seed/afritech1/400/250',
        logo: 'https://picsum.photos/seed/afritechlogo/100/100',
        description: 'Une solution d’apprentissage en ligne adaptée aux écoles africaines.',
        price: 'Abonnement mensuel',
        link: 'https://afritech.cd/e-learning',
      },
      {
        id: 101,
        name: 'Plateforme e-learning AfriTech',
        image: 'https://picsum.photos/seed/afritech1/400/250',
        logo: 'https://picsum.photos/seed/afritechlogo/100/100',
        description: 'Une solution d’apprentissage en ligne adaptée aux écoles africaines.',
        price: 'Abonnement mensuel',
        link: 'https://afritech.cd/e-learning',
      },
      {
        id: 101,
        name: 'Plateforme e-learning AfriTech',
        image: 'https://picsum.photos/seed/afritech1/400/250',
        logo: 'https://picsum.photos/seed/afritechlogo/100/100',
        description: 'Une solution d’apprentissage en ligne adaptée aux écoles africaines.',
        price: 'Abonnement mensuel',
        link: 'https://afritech.cd/e-learning',
      },
      {
        id: 101,
        name: 'Plateforme e-learning AfriTech',
        image: 'https://picsum.photos/seed/afritech1/400/250',
        logo: 'https://picsum.photos/seed/afritechlogo/100/100',
        description: 'Une solution d’apprentissage en ligne adaptée aux écoles africaines.',
        price: 'Abonnement mensuel',
        link: 'https://afritech.cd/e-learning',
      },
    ],
  },
  {
    id: 2,
    name: 'Patrick Mwamba',
    photo: 'https://picsum.photos/seed/patrick/300/300',
    title: 'CEO de CongoWear',
    bio: 'Créateur de mode moderne inspirée des traditions congolaises.',
    location: 'Lubumbashi, RDC',
    category: 'Mode',
    socials: [
      {
        website: 'https://congowear.cd',
      },
      {
        linkedin: 'https://linkedin.com/in/patrickmwamba',
      },
    ],
    products: [
      {
        id: 102,
        name: 'Collection Congo Elegance',
        image: 'https://picsum.photos/seed/congowear1/400/250',
        logo: 'https://picsum.photos/seed/congowearlogo/100/100',
        description: 'Ligne de vêtements alliant élégance moderne et tissus traditionnels.',
        price: 'À partir de 50$',
        link: 'https://congowear.cd/elegance',
      },
    ],
  },
  {
    id: 3,
    name: 'Amina Tshisekedi',
    photo: 'https://picsum.photos/seed/amina/300/300',
    title: 'Fondatrice de BioRDC',
    bio: 'Promotrice de produits alimentaires biologiques locaux.',
    location: 'Goma, RDC',
    category: 'Agroalimentaire',
    socials: [
      {
        facebook: 'https://facebook.com/bioRDC',
      },
    ],
    products: [
      {
        id: 103,
        name: 'Miel 100% naturel',
        image: 'https://picsum.photos/seed/mielrdc/400/250',
        logo: 'https://picsum.photos/seed/biordclogo/100/100',
        description: 'Miel pur récolté dans les montagnes du Kivu.',
        price: '10$ le pot',
        link: 'https://biordc.cd/miel',
      },
    ],
  },
  {
    id: 4,
    name: 'David Ilunga',
    photo: 'https://picsum.photos/seed/david/300/300',
    title: 'Fondateur de RDC Solar',
    bio: 'Ingénieur engagé dans l’énergie solaire pour les foyers congolais.',
    location: 'Mbuji-Mayi, RDC',
    category: 'Énergie',
    socials: [
      {
        website: 'https://rdcsolar.cd',
      },
    ],
    products: [
      {
        id: 104,
        name: 'Kit solaire maison',
        image: 'https://picsum.photos/seed/rdcsolar/400/250',
        logo: 'https://picsum.photos/seed/rdcsolarlogo/100/100',
        description: 'Un kit complet pour électrifier une maison rurale.',
        price: '200$',
        link: 'https://rdcsolar.cd/kit',
      },
    ],
  },
  {
    id: 5,
    name: 'Grace Mulumba',
    photo: 'https://picsum.photos/seed/grace/300/300',
    title: 'Fondatrice de CongoCosmetics',
    bio: 'Passionnée de beauté, elle développe des cosmétiques naturels.',
    location: 'Bukavu, RDC',
    category: 'Cosmétiques',
    socials: [
      {
        instagram: 'https://instagram.com/congocosmetics',
      },
    ],
    products: [
      {
        id: 105,
        name: 'Crème hydratante au karité',
        image: 'https://picsum.photos/seed/karite/400/250',
        logo: 'https://picsum.photos/seed/congocosmlogo/100/100',
        description: 'Produit naturel à base de beurre de karité congolais.',
        price: '15$',
        link: 'https://congocosmetics.cd/karite',
      },
    ],
  },
  {
    id: 6,
    name: 'Jean-Paul Kasongo',
    photo: 'https://picsum.photos/seed/kasongo/300/300',
    title: 'CEO de CongoTech',
    bio: 'Expert en développement logiciel et solutions digitales.',
    location: 'Kinshasa, RDC',
    category: 'Technologie',
    socials: [
      {
        linkedin: 'https://linkedin.com/in/jeanpaulkasongo',
      },
    ],
    products: [
      {
        id: 106,
        name: 'Application RDC Services',
        image: 'https://picsum.photos/seed/rdcservices/400/250',
        logo: 'https://picsum.photos/seed/congotechlogo/100/100',
        description: 'Application qui connecte citoyens et services publics.',
        price: 'Gratuit',
        link: 'https://congotech.cd/services',
      },
    ],
  },
  {
    id: 7,
    name: 'Chantal Mbayo',
    photo: 'https://picsum.photos/seed/chantal/300/300',
    title: 'Fondatrice de Mbayo Arts',
    bio: 'Artiste plasticienne et promotrice de l’art congolais.',
    location: 'Lubumbashi, RDC',
    category: 'Art & Culture',
    socials: [
      {
        instagram: 'https://instagram.com/mbayoarts',
      },
    ],
    products: [
      {
        id: 107,
        name: 'Tableaux contemporains',
        image: 'https://picsum.photos/seed/mbayoart/400/250',
        logo: 'https://picsum.photos/seed/mbayoartlogo/100/100',
        description: 'Œuvres inspirées des traditions congolaises et modernité.',
        price: 'Sur demande',
        link: 'https://mbayoarts.cd/gallery',
      },
    ],
  },
  {
    id: 8,
    name: 'Eric Nsimba',
    photo: 'https://picsum.photos/seed/eric/300/300',
    title: 'Fondateur de AgroCongo',
    bio: 'Entrepreneur agricole, il valorise les produits locaux.',
    location: 'Matadi, RDC',
    category: 'Agroalimentaire',
    socials: [
      {
        facebook: 'https://facebook.com/agrocongo',
      },
    ],
    products: [
      {
        id: 108,
        name: 'Café du Kivu',
        image: 'https://picsum.photos/seed/cafe/400/250',
        logo: 'https://picsum.photos/seed/agrocongologo/100/100',
        description: 'Café 100% arabica produit au Kivu.',
        price: '12$ le paquet',
        link: 'https://agrocongo.cd/cafe',
      },
    ],
  },
  {
    id: 9,
    name: 'Nadia Lemba',
    photo: 'https://picsum.photos/seed/nadia/300/300',
    title: 'CEO de KinDesign',
    bio: 'Designer spécialisée dans le mobilier moderne congolais.',
    location: 'Kinshasa, RDC',
    category: 'Design',
    socials: [
      {
        website: 'https://kindesign.cd',
      },
    ],
    products: [
      {
        id: 109,
        name: 'Chaise artisanale moderne',
        image: 'https://picsum.photos/seed/chaise/400/250',
        logo: 'https://picsum.photos/seed/kindesignlogo/100/100',
        description: 'Mobilier design inspiré de l’artisanat local.',
        price: '150$',
        link: 'https://kindesign.cd/chaise',
      },
    ],
  },
  {
    id: 10,
    name: 'Michel Tshibanda',
    photo: 'https://picsum.photos/seed/michel/300/300',
    title: 'Fondateur de CongoTransport',
    bio: 'Innovateur dans les solutions de mobilité urbaine.',
    location: 'Kinshasa, RDC',
    category: 'Transport',
    socials: [
      {
        linkedin: 'https://linkedin.com/in/micheltshibanda',
      },
    ],
    products: [
      {
        id: 110,
        name: 'Application TaxiRDC',
        image: 'https://picsum.photos/seed/taxiapp/400/250',
        logo: 'https://picsum.photos/seed/congotransportlogo/100/100',
        description: 'Service de réservation de taxis en ligne.',
        price: 'Téléchargement gratuit',
        link: 'https://congotransport.cd/taxi',
      },
    ],
  },
];
