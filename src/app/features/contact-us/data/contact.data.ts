import { LucideIconData, MailCheck, Phone, MapPin, Clock, ScanFace } from 'lucide-angular';

interface IContactChildren {
  label?: string;
  value: string;
}

// interface ISocialMedia {
//   label: string;
//   link: string;
//   icon: LucideIconData;
// }
interface IContact {
  title: string;
  icon: LucideIconData;
  description: string;
  children: IContactChildren[];
}

export const CONTACT_ITEMS: IContact[] = [
  {
    title: 'Rejoignez-nous par email',
    icon: MailCheck,
    description: 'Nous vous répondons dans les plus brefs délais.',
    children: [
      {
        label: 'Support client',
        value: 'info@cinolu.org '
      }
    ]
  },
  {
    title: 'Appelez-nous',
    icon: Phone,
    description: 'Notre équipe est disponible pour vos appels du lundi au samedi.',
    children: [
      {
        label: 'Téléphone',
        value: '+243 976 807 000 '
      }
    ]
  },
  {
    title: 'Adresse',
    icon: MapPin,
    description: 'Venez nous rendre visite à notre siège.',
    children: [
      {
        label: 'Adresse',
        value: ' 221, Av. des usines, Makomeno, Lubumbashi, Haut-Katanga-RDC'
      }
    ]
  },
  {
    title: 'Horaires d’ouverture',
    icon: Clock,
    description: 'Nous sommes ouverts tous les jours ouvrables.',
    children: [
      {
        label: 'Lundi - Vendredi',
        value: '08h00 - 17h00'
      }
    ]
  },
  {
    title: 'Suivez-nous',
    icon: ScanFace,
    description: 'Restez connectés à notre actualité.',
    children: [
      {
        label: 'Facebook',
        value: 'https://facebook.com/entreprise'
      },
      {
        label: 'Instagram',
        value: 'https://www.instagram.com/centredinnovationdelubumbashi/?utm_source=ig_web_button_share_sheet'
      },
      {
        label: 'twitter',
        value: 'https://x.com/Lubumdigital'
      },
      {
        label: 'tiktok',
        value: 'https://www.tiktok.com/@cinolu'
      },
      {
        label: 'linkedin',
        value: 'https://www.linkedin.com/company/cinolu'
      }
    ]
  }
];
