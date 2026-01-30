import { BadgeLevel, BADGE_LEVELS, MOTIVATION_MESSAGES, SHARE_MESSAGES } from '@shared/config/badges.config';

/**
 * Résultat du calcul du badge utilisateur
 */
export interface BadgeResult {
  /** Badge actuel de l'utilisateur */
  currentBadge: BadgeLevel;
  /** Badge suivant (ou null si niveau max) */
  nextBadge: BadgeLevel | null;
  /** Nombre d'inscriptions actuelles */
  currentCount: number;
  /** Pourcentage de progression vers le prochain badge (0-100) */
  progressPercentage: number;
  /** Nombre d'inscriptions restantes pour le prochain badge */
  remainingCount: number;
  /** Est-ce que l'utilisateur a atteint le niveau maximum */
  isMaxLevel: boolean;
  /** Message motivationnel adapté */
  motivationMessage: string;
  /** Message de partage personnalisé */
  shareMessage: string;
}

/**
 * Détermine le badge actuel d'un utilisateur selon son nombre d'inscriptions
 */
export function getCurrentBadge(referralCount: number): BadgeLevel {
  // Si aucune inscription, retourner le premier niveau
  if (referralCount === 0) {
    return BADGE_LEVELS[0];
  }

  // Trouver le badge le plus élevé que l'utilisateur a débloqué
  let currentBadge = BADGE_LEVELS[0];

  for (const badge of BADGE_LEVELS) {
    if (referralCount >= badge.threshold) {
      currentBadge = badge;
    } else {
      break;
    }
  }

  return currentBadge;
}

/**
 * Détermine le badge suivant
 */
export function getNextBadge(currentBadge: BadgeLevel): BadgeLevel | null {
  const currentIndex = BADGE_LEVELS.findIndex((b) => b.level === currentBadge.level);

  if (currentIndex === -1 || currentIndex === BADGE_LEVELS.length - 1) {
    return null; // Niveau maximum atteint
  }

  return BADGE_LEVELS[currentIndex + 1];
}

/**
 * Calcule le pourcentage de progression vers le prochain badge
 */
export function calculateProgress(
  referralCount: number,
  currentBadge: BadgeLevel,
  nextBadge: BadgeLevel | null
): number {
  if (!nextBadge) {
    return 100; // Niveau max atteint
  }

  // La progression se fait toujours entre le badge actuel et le prochain
  const previousThreshold = currentBadge.threshold;
  const targetThreshold = nextBadge.threshold;

  const progress = referralCount - previousThreshold;
  const total = targetThreshold - previousThreshold;

  return Math.min(Math.max(Math.round((progress / total) * 100), 0), 100);
}

/**
 * Calcule le nombre d'inscriptions restantes pour le prochain badge
 */
export function getRemainingCount(referralCount: number, nextBadge: BadgeLevel | null): number {
  if (!nextBadge) {
    return 0;
  }

  return Math.max(0, nextBadge.threshold - referralCount);
}

/**
 * Génère un message motivationnel adapté à la progression
 */
export function getMotivationMessage(progressPercentage: number, remainingCount: number, isMaxLevel: boolean): string {
  if (isMaxLevel) {
    return MOTIVATION_MESSAGES.max;
  }

  if (progressPercentage === 0) {
    return MOTIVATION_MESSAGES.start;
  }

  if (progressPercentage >= 75) {
    return MOTIVATION_MESSAGES.close(remainingCount);
  }

  return MOTIVATION_MESSAGES.halfway(remainingCount);
}

/**
 * Fonction principale qui calcule toutes les informations du badge
 * À utiliser dans les composants pour obtenir un résultat complet
 */
export function calculateBadgeInfo(referralCount: number): BadgeResult {
  const currentBadge = getCurrentBadge(referralCount);
  const nextBadge = getNextBadge(currentBadge);
  const progressPercentage = calculateProgress(referralCount, currentBadge, nextBadge);
  const remainingCount = getRemainingCount(referralCount, nextBadge);
  const isMaxLevel = nextBadge === null;
  const motivationMessage = getMotivationMessage(progressPercentage, remainingCount, isMaxLevel);
  const shareMessage = SHARE_MESSAGES[currentBadge.level] || SHARE_MESSAGES[1];

  return {
    currentBadge,
    nextBadge,
    currentCount: referralCount,
    progressPercentage,
    remainingCount,
    isMaxLevel,
    motivationMessage,
    shareMessage
  };
}

/**
 * Vérifie si un nouveau badge a été débloqué
 * Utile pour afficher des notifications
 */
export function hasUnlockedNewBadge(previousCount: number, newCount: number): BadgeLevel | null {
  const previousBadge = getCurrentBadge(previousCount);
  const newBadge = getCurrentBadge(newCount);

  if (newBadge.level > previousBadge.level) {
    return newBadge;
  }

  return null;
}
