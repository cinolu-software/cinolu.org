import { LucideIconData, MailCheck, Phone, MapPin, Clock, ScanFace } from 'lucide-angular';

interface IContactChildren {
  label?: string;
  value: string;
}
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
        label: 'Email principal',
        value: 'contact@entreprise.com'
      },
      {
        label: 'Support client',
        value: 'support@entreprise.com'
      }
    ]
  },
  {
    title: 'Appelez-nous',
    icon: Phone,
    description: 'Notre équipe est disponible pour vos appels du lundi au samedi.',
    children: [
      {
        label: 'Téléphone (WhatsApp)',
        value: '+243 970 000 001'
      },
      {
        label: 'Téléphone (Appels)',
        value: '+243 820 000 002'
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
        value: '10, Avenue de l’Industrie, Gombe, Kinshasa, RDC'
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
      },
      {
        label: 'Samedi',
        value: '09h00 - 13h00'
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
        value: 'https://instagram.com/entreprise'
      }
    ]
  }
];
