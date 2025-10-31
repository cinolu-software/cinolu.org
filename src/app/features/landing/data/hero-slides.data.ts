import { LucideIconData, Lightbulb, Rocket, PartyPopper } from 'lucide-angular';

export interface IHeroSlide {
  id: number;
  badge: {
    icon: LucideIconData;
    text: string;
  };
  title: string;
  titleHighlight: string;
  description: string;
  backgroundImage: string;
  primaryCta: {
    text: string;
    link: string;
  };
  secondaryCta?: {
    text: string;
    link: string;
    external?: boolean;
  };
}

export const HERO_SLIDES: IHeroSlide[] = [
  {
    id: 1,
    badge: {
      icon: PartyPopper,
      text: "10 ans d'innovation !"
    },
    title: 'Célébrons 10 ans',
    titleHighlight: "D'impact et d'inspiration",
    description:
      'Depuis 2015, nous accompagnons les talents congolais et africains à transformer leurs idées en solutions durables.',
    backgroundImage: '/images/cinolu-10.jpg',
    primaryCta: {
      text: 'Notre histoire',
      link: '/about-us'
    },
    secondaryCta: {
      text: 'Rejoignez-nous',
      link: '/sign-up'
    }
  },
  {
    id: 2,
    badge: {
      icon: Lightbulb,
      text: 'Innovons ensemble !'
    },
    title: 'Accélérons les talents',
    titleHighlight: 'Connectons les opportunités',
    description:
      "Le Centre d'Innovation de Lubumbashi (Cinolu) est un espace vivant où les idées deviennent des solutions pour bâtir des villes intelligentes, inclusives et durables.",
    backgroundImage: '/images/hero.jpg',
    primaryCta: {
      text: 'Devenir membre',
      link: '/sign-up'
    },
    secondaryCta: {
      text: 'Faire un don',
      link: 'https://www.every.org/centre-dinnovation-lubumbashi-asbl?utm_campaign=donate-link#/donate',
      external: true
    }
  },
  {
    id: 3,
    badge: {
      icon: Rocket,
      text: 'Lancez votre projet !'
    },
    title: 'Transformez vos idées',
    titleHighlight: 'En solutions innovantes',
    description:
      "Bénéficiez d'un accompagnement personnalisé, d'un accès à des ressources de qualité et d'un réseau d'entrepreneurs passionnés pour concrétiser vos projets.",
    backgroundImage: '/images/cinolu-11.jpg',
    primaryCta: {
      text: 'Nos programmes',
      link: '/programs'
    },
    secondaryCta: {
      text: 'Nos projets',
      link: '/programs'
    }
  }
];
