import { calculateBadgeInfo } from './badges.helper';

/**
 * Options de partage sur les réseaux sociaux
 */
export interface ShareOptions {
  platform: 'whatsapp' | 'linkedin' | 'facebook' | 'twitter';
  link: string;
  referralCount: number;
}

/**
 * Génère un message de partage personnalisé selon le niveau du badge
 */
export function generateShareMessage(referralCount: number): string {
  const badgeInfo = calculateBadgeInfo(referralCount);
  return badgeInfo.shareMessage;
}

/**
 * Génère l'URL de partage pour WhatsApp
 */
export function shareToWhatsApp(link: string, referralCount: number): void {
  const message = generateShareMessage(referralCount);
  const text = encodeURIComponent(`${message} 👇\n\n${link}`);
  const url = `https://wa.me/?text=${text}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Génère l'URL de partage pour LinkedIn
 */
export function shareToLinkedIn(link: string): void {
  // LinkedIn ne supporte pas de message pré-rempli via URL
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`;
  window.open(url, '_blank', 'noopener,noreferrer,width=600,height=600');
}

/**
 * Génère l'URL de partage pour Facebook
 */
export function shareToFacebook(link: string): void {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
  window.open(url, '_blank', 'noopener,noreferrer,width=600,height=600');
}

/**
 * Génère l'URL de partage pour Twitter/X
 */
export function shareToTwitter(link: string, referralCount: number): void {
  const message = generateShareMessage(referralCount);
  const text = encodeURIComponent(`${message} ${link}`);
  const url = `https://twitter.com/intent/tweet?text=${text}`;
  window.open(url, '_blank', 'noopener,noreferrer,width=600,height=600');
}

/**
 * Fonction principale pour partager sur une plateforme
 */
export function shareToSocial(options: ShareOptions): void {
  const { platform, link, referralCount } = options;

  switch (platform) {
    case 'whatsapp':
      shareToWhatsApp(link, referralCount);
      break;
    case 'linkedin':
      shareToLinkedIn(link);
      break;
    case 'facebook':
      shareToFacebook(link);
      break;
    case 'twitter':
      shareToTwitter(link, referralCount);
      break;
    default:
      console.error('Plateforme de partage non supportée');
  }
}

/**
 * Vérifie si l'API Web Share est disponible
 */
export function canUseWebShare(): boolean {
  return typeof navigator !== 'undefined' && 'share' in navigator;
}

/**
 * Utilise l'API Web Share native (mobile)
 */
export async function shareWithWebAPI(link: string, referralCount: number): Promise<void> {
  if (!canUseWebShare()) {
    throw new Error('Web Share API non disponible');
  }

  const message = generateShareMessage(referralCount);

  try {
    await navigator.share({
      title: 'Rejoins Cinolu',
      text: message,
      url: link
    });
  } catch (error) {
    // L'utilisateur a annulé le partage ou une erreur s'est produite
    if ((error as Error).name !== 'AbortError') {
      throw error;
    }
  }
}
