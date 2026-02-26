/**
 * URL de fallback après login quand returnUrl est absent ou invalide.
 */
export const AUTH_REDIRECT_FALLBACK = '/dashboard';

/** Chemins considérés comme "page de login" — on ne redirige jamais vers eux après connexion. */
const LOGIN_PATHS = ['/sign-in', '/login'];

/**
 * Valide un returnUrl issu des query params.
 * - Absent / vide / pas une chaîne → fallback
 * - Ne commence pas par `/` (URL externe) → fallback
 * - Page de login (éviter boucle) → fallback
 *
 * @param returnUrl - Valeur brute (query param)
 * @returns URL sûre, toujours relative (commence par /), jamais la page de login
 */
export function validateReturnUrl(returnUrl: string | null | undefined): string {
  if (returnUrl == null || typeof returnUrl !== 'string') {
    return AUTH_REDIRECT_FALLBACK;
  }
  const trimmed = returnUrl.trim();
  if (trimmed === '' || !trimmed.startsWith('/')) {
    return AUTH_REDIRECT_FALLBACK;
  }
  const path = trimmed.split('?')[0];
  if (LOGIN_PATHS.some((login) => path === login || path.startsWith(login + '/'))) {
    return AUTH_REDIRECT_FALLBACK;
  }
  return trimmed;
}
