export const purposes: {
  title: string;
  image: string;
  description: string;
  icon: string;
  features: { name: string }[];
}[] = [
  {
    title: 'Startups et PMEs',
    description:
      'Du lancement à la croissance, CINOLU offre des ressources, du mentorat et des opportunités de financement pour aider les entrepreneurs à concrétiser leurs idées et à atteindre leurs objectifs commerciaux.',
    image: '/images/purposes/startup.webp',
    icon: 'lightbulb',
    features: [
      { name: 'Inscrivez-vous à nos programmes' },
      { name: 'Partagez un espace physique avec des personnes partageant les mêmes idées et visionnaires' },
      { name: "Devenez membre d'un réseau d'innovateurs et de mentors les plus dynamiques de la région" },
      { name: 'Accès au financement et aux opportunités de marché' }
    ]
  },

  {
    title: 'ISOs & ESOs',
    description: "Améliorons notre impact et  réseau tout contribuant ainsi à l'écosystème entrepreneurial global.",
    image: '/images/purposes/iso.webp',
    icon: 'euro_symbol',
    features: [
      {
        name: "Renforcement des Capacités : Accédez à des formations et des outils pour améliorer vos services d'accompagnement"
      },
      { name: "Networking : Élargissez votre réseau en connectant avec d'autres organisations similaires" },
      { name: 'Partenariats Stratégiques : Développer des collaborations stratégiques pour maximiser votre impact' }
    ]
  },
  {
    title: 'Corporates & Organisations',
    description:
      "Élaboration des politiques publiques favorables à l'innovation, soutient des initiatives de développement économique, conception et mise en œuvre des programmes d'accompagnement pour les entrepreneurs.",
    image: '/images/purposes/corporate.webp',
    icon: 'location_city',
    features: [
      {
        name: "Influence Politique : Participez à l'élaboration de politiques favorables à l'innovation et à l'entrepreneuriat."
      },
      {
        name: 'Soutien au Développement Économique : Contribuez à des initiatives qui stimulent la croissance économique locale et nationale.'
      },
      {
        name: "Programmes d'Accompagnement : Collaborez à la mise en place de programmes d'accompagnement pour les entrepreneurs"
      }
    ]
  },
  {
    title: 'Gouvernement & Institutions',
    description:
      'Apportez vos connaissances et créez un impact rejoignez des centaines de leaders mondiaux qui partagent leur expertise avec des fondateurs de startups du monde entier.',
    image: '/images/purposes/government.webp',
    icon: 'check_circle',
    features: [
      { name: 'Visibilité sur nos médias en ligne' },
      { name: 'Accès aux talents et aux futurs partenaires potentiel' },
      { name: 'Présentation des produits' },
      { name: "Positionnement en tant que soutien à l'innovation" },
      {
        name: "Détectez les tendances de demain et accédez à des solutions qui vous feront gagner du temps et de l'argent"
      }
    ]
  }
];
