/**
 * Configuration et constantes pour le module de parrainage
 */

// Classes CSS réutilisables
export const REFERRAL_CSS_CLASSES = {
  BTN_PRIMARY: 'dashboard-btn-primary',
  BTN_SECONDARY: 'dashboard-btn-secondary',
  CARD: 'dashboard-card',
  CARD_ELEVATED: 'dashboard-card-elevated',
  CARD_HOVER: 'dashboard-card-hover',
  HEADING_2: 'dashboard-heading-2',
  HEADING_3: 'dashboard-heading-3',
  HEADING_4: 'dashboard-heading-4',
  HEADING_5: 'dashboard-heading-5',
  TEXT_BODY: 'dashboard-text-body',
  TEXT_SMALL: 'dashboard-text-small',
  TEXT_TINY: 'dashboard-text-tiny',
  BADGE_PRIMARY: 'dashboard-badge-primary',
  BADGE_SUCCESS: 'dashboard-badge-success',
  BADGE_INFO: 'dashboard-badge-info',
  BADGE_WARNING: 'dashboard-badge-warning',
  BADGE_NEUTRAL: 'dashboard-badge-neutral'
} as const;

// Configuration du module
export const REFERRAL_CONFIG = {
  // Nombre maximum d'événements à afficher dans la timeline
  MAX_TIMELINE_EVENTS: 20,

  // Taille du QR Code
  QR_CODE_SIZE: 300,

  // Clé de cache localStorage pour le QR Code
  QR_CODE_CACHE_KEY: 'cinolu_referral_qr_cache',

  // Durée de vie du cache QR Code (7 jours en ms)
  QR_CODE_CACHE_TTL: 7 * 24 * 60 * 60 * 1000,

  // Messages de partage social
  SOCIAL_MESSAGES: {
    WHATSAPP: `Rejoins-moi sur Cinolu, la plateforme qui accompagne les entrepreneurs africains !

Inscris-toi avec mon lien de parrainage :
{LINK}

Ensemble, construisons l'écosystème entrepreneurial de demain !`,

    TWITTER: `Rejoins-moi sur @Cinolu_org, la plateforme pour entrepreneurs africains !

Inscris-toi avec mon lien de parrainage`,

    FACEBOOK_HASHTAGS: '#Cinolu #Entrepreneuriat #Afrique'
  }
} as const;

// Interface pour le cache QR Code
export interface QRCodeCache {
  dataUrl: string;
  referralCode: string;
  timestamp: number;
}
