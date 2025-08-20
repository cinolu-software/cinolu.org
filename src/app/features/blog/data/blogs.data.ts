interface IBlog {
  id: number;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  path: string;
  slug: string;
  content: string;
  status: 'published' | 'draft' | 'archived';
  readingTime: string;
  updatedAt: string;
}

export const BLOGS: IBlog[] = [
  {
    id: 1,
    title: 'Lancement du programme entrepreneurial 2025',
    description:
      'Découvrez comment notre hub accompagne les jeunes entrepreneurs...',
    date: '2025-08-01',
    author: 'Ackeem Mbuebua',
    category: 'Programmes',
    tags: ['Entrepreneuriat', 'Formation', 'Innovation'],
    image:
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&auto=format&fit=crop&q=60',
    path: '/blog/lancement-programme-2025',
    slug: 'lancement-programme-2025',
    content:
      "Le programme entrepreneurial 2025 démarre avec une nouvelle approche axée sur l'innovation et l'impact social.",
    status: 'published',
    readingTime: '4 min',
    updatedAt: '2025-08-02',
  },
  {
    id: 2,
    title: 'Retour sur le Bootcamp de juillet',
    description: 'Un mois intense de formations, ateliers et networking...',
    date: '2025-07-30',
    author: 'Sarah Kabila',
    category: 'Événements',
    tags: ['Bootcamp', 'Formation', 'Jeunes'],
    image:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60',
    path: '/blog/bootcamp-juillet-2025',
    slug: 'bootcamp-juillet-2025',
    content:
      'Le Bootcamp de juillet a rassemblé plus de 50 entrepreneurs autour d’ateliers pratiques et de sessions de mentorat.',
    status: 'published',
    readingTime: '5 min',
    updatedAt: '2025-07-31',
  },
  {
    id: 3,
    title: 'Portrait : Marie, fondatrice de EcoClean',
    description:
      'Inspirée par l’écologie, Marie a transformé une idée en entreprise...',
    date: '2025-07-25',
    author: 'Ackeem Mbuebua',
    category: 'Portraits',
    tags: ['Success Story', 'Ecologie', 'Innovation'],
    image:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&auto=format&fit=crop&q=60',
    path: '/blog/portrait-marie-ecoclean',
    slug: 'portrait-marie-ecoclean',
    content:
      'Marie a lancé EcoClean pour proposer des solutions de nettoyage écologiques et durables dans les villes africaines.',
    status: 'published',
    readingTime: '3 min',
    updatedAt: '2025-07-25',
  },
  {
    id: 4,
    title: '5 conseils pour réussir son pitch',
    description:
      'Apprenez à capter l’attention des investisseurs en quelques minutes.',
    date: '2025-07-20',
    author: 'Sarah Kabila',
    category: 'Conseils',
    tags: ['Pitch', 'Investisseurs', 'Startup'],
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=60',
    path: '/blog/5-conseils-pour-reussir-son-pitch',
    slug: '5-conseils-pour-reussir-son-pitch',
    content:
      'Pour convaincre un investisseur, il est crucial d’avoir un pitch clair, structuré et orienté vers la valeur ajoutée.',
    status: 'published',
    readingTime: '6 min',
    updatedAt: '2025-07-20',
  },
  {
    id: 5,
    title: 'Nouvelles subventions pour les jeunes entrepreneurs',
    description: 'Un financement inédit pour soutenir les projets innovants.',
    date: '2025-07-15',
    author: 'Ackeem Mbuebua',
    category: 'Actualités',
    tags: ['Subventions', 'Finance', 'Innovation'],
    image:
      'https://images.unsplash.com/photo-1534126511673-b6899657816a?w=600&auto=format&fit=crop&q=60',
    path: '/blog/nouvelles-subventions-2025',
    slug: 'nouvelles-subventions-2025',
    content:
      'Un nouveau fonds de soutien est mis en place pour encourager les jeunes entrepreneurs à concrétiser leurs projets.',
    status: 'published',
    readingTime: '4 min',
    updatedAt: '2025-07-16',
  },
  {
    id: 6,
    title: 'Les tendances entrepreneuriales en 2025',
    description: 'Découvrez les secteurs porteurs pour cette année.',
    date: '2025-07-10',
    author: 'Sarah Kabila',
    category: 'Analyse',
    tags: ['Tendances', 'Business', '2025'],
    image:
      'https://images.unsplash.com/photo-1522204605094-1c6a26b4856e?w=600&auto=format&fit=crop&q=60',
    path: '/blog/tendances-entrepreneuriales-2025',
    slug: 'tendances-entrepreneuriales-2025',
    content:
      'Les secteurs de la technologie verte, de la santé numérique et du e-commerce social devraient exploser cette année.',
    status: 'published',
    readingTime: '7 min',
    updatedAt: '2025-07-11',
  },
  {
    id: 7,
    title: 'Comment créer un business plan solide',
    description: 'La feuille de route indispensable pour tout entrepreneur.',
    date: '2025-07-05',
    author: 'Ackeem Mbuebua',
    category: 'Conseils',
    tags: ['Business plan', 'Startup', 'Financement'],
    image:
      'https://images.unsplash.com/photo-1520975698519-59c54b6b9c9f?w=600&auto=format&fit=crop&q=60',
    path: '/blog/comment-creer-un-business-plan-solide',
    slug: 'comment-creer-un-business-plan-solide',
    content:
      'Un business plan clair et chiffré est essentiel pour convaincre les partenaires financiers.',
    status: 'published',
    readingTime: '8 min',
    updatedAt: '2025-07-05',
  },
  {
    id: 8,
    title: 'Rencontre avec nos mentors',
    description: 'Les experts qui accompagnent nos entrepreneurs au quotidien.',
    date: '2025-07-01',
    author: 'Sarah Kabila',
    category: 'Portraits',
    tags: ['Mentorat', 'Expertise', 'Accompagnement'],
    image:
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=600&auto=format&fit=crop&q=60',
    path: '/blog/rencontre-avec-nos-mentors',
    slug: 'rencontre-avec-nos-mentors',
    content:
      'Nos mentors partagent leurs expériences et conseillent les jeunes entrepreneurs dans leurs parcours.',
    status: 'published',
    readingTime: '5 min',
    updatedAt: '2025-07-02',
  },
  {
    id: 9,
    title: 'Comment lever des fonds efficacement',
    description: 'Stratégies pour réussir sa campagne de financement.',
    date: '2025-06-28',
    author: 'Ackeem Mbuebua',
    category: 'Finance',
    tags: ['Levée de fonds', 'Investisseurs', 'Startup'],
    image:
      'https://images.unsplash.com/photo-1556742400-b5b7c5121f1d?w=600&auto=format&fit=crop&q=60',
    path: '/blog/comment-lever-des-fonds-efficacement',
    slug: 'comment-lever-des-fonds-efficacement',
    content:
      'Lever des fonds nécessite une préparation rigoureuse et une communication ciblée.',
    status: 'published',
    readingTime: '7 min',
    updatedAt: '2025-06-29',
  },
  {
    id: 10,
    title: "L'importance du réseautage",
    description:
      'Construire des relations solides pour faire grandir son projet.',
    date: '2025-06-25',
    author: 'Sarah Kabila',
    category: 'Conseils',
    tags: ['Réseautage', 'Relations', 'Opportunités'],
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&auto=format&fit=crop&q=60',
    path: '/blog/l-importance-du-reseautage',
    slug: 'l-importance-du-reseautage',
    content:
      "Le réseautage permet de rencontrer des partenaires clés et d'ouvrir de nouvelles opportunités.",
    status: 'published',
    readingTime: '4 min',
    updatedAt: '2025-06-25',
  },
  {
    id: 11,
    title: 'Créer une marque forte',
    description:
      'Les bases pour développer une identité qui inspire confiance.',
    date: '2025-06-20',
    author: 'Ackeem Mbuebua',
    category: 'Branding',
    tags: ['Marque', 'Identité', 'Marketing'],
    image:
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop&q=60',
    path: '/blog/creer-une-marque-forte',
    slug: 'creer-une-marque-forte',
    content:
      'Une marque forte repose sur des valeurs claires et une communication cohérente.',
    status: 'published',
    readingTime: '6 min',
    updatedAt: '2025-06-21',
  },
  {
    id: 12,
    title: "L'impact social des startups",
    description: 'Quand entrepreneuriat rime avec changement positif.',
    date: '2025-06-15',
    author: 'Sarah Kabila',
    category: 'Impact',
    tags: ['Impact social', 'Innovation', 'Communauté'],
    image:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60',
    path: '/blog/l-impact-social-des-startups',
    slug: 'l-impact-social-des-startups',
    content:
      'De plus en plus de startups intègrent un objectif social ou environnemental dans leur modèle d’affaires.',
    status: 'published',
    readingTime: '5 min',
    updatedAt: '2025-06-16',
  },
  {
    id: 13,
    title: 'Organiser un événement entrepreneurial réussi',
    description: 'Clés pour attirer, inspirer et connecter les participants.',
    date: '2025-06-10',
    author: 'Ackeem Mbuebua',
    category: 'Événements',
    tags: ['Organisation', 'Evénement', 'Réseautage'],
    image:
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=600&auto=format&fit=crop&q=60',
    path: '/blog/organiser-un-evenement-entrepreneurial-reussi',
    slug: 'organiser-un-evenement-entrepreneurial-reussi',
    content:
      'Un événement réussi repose sur une bonne préparation, une communication efficace et une ambiance conviviale.',
    status: 'published',
    readingTime: '6 min',
    updatedAt: '2025-06-11',
  },
  {
    id: 14,
    title: "Les femmes dans l'entrepreneuriat",
    description: 'Portraits et parcours inspirants de femmes entrepreneures.',
    date: '2025-06-05',
    author: 'Sarah Kabila',
    category: 'Portraits',
    tags: ['Femmes', 'Leadership', 'Inspiration'],
    image:
      'https://images.unsplash.com/photo-1521790361557-2a3d6d3f9c88?w=600&auto=format&fit=crop&q=60',
    path: '/blog/les-femmes-dans-l-entrepreneuriat',
    slug: 'les-femmes-dans-l-entrepreneuriat',
    content:
      'Les femmes entrepreneures apportent une vision unique et essentielle dans le monde des affaires.',
    status: 'published',
    readingTime: '4 min',
    updatedAt: '2025-06-06',
  },
  {
    id: 15,
    title: 'Les erreurs à éviter en lançant sa startup',
    description: 'Pièges courants et comment les contourner.',
    date: '2025-06-01',
    author: 'Ackeem Mbuebua',
    category: 'Conseils',
    tags: ['Startup', 'Erreurs', 'Conseils'],
    image:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60',
    path: '/blog/les-erreurs-a-eviter-en-lancant-sa-startup',
    slug: 'les-erreurs-a-eviter-en-lancant-sa-startup',
    content:
      'Éviter les erreurs courantes permet de gagner du temps et de maximiser ses chances de succès.',
    status: 'published',
    readingTime: '5 min',
    updatedAt: '2025-06-01',
  },
  {
    id: 16,
    title: 'Construire un réseau international',
    description: 'Comment élargir ses horizons au-delà des frontières.',
    date: '2025-05-28',
    author: 'Sarah Kabila',
    category: 'Réseautage',
    tags: ['International', 'Réseau', 'Opportunités'],
    image:
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=600&auto=format&fit=crop&q=60',
    path: '/blog/construire-un-reseau-international',
    slug: 'construire-un-reseau-international',
    content:
      'Un réseau international ouvre la porte à de nouvelles collaborations et opportunités d’affaires.',
    status: 'published',
    readingTime: '7 min',
    updatedAt: '2025-05-29',
  },
];

