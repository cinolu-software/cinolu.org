import type { IUser } from '@shared/models';

/** Rôles reconnus côté front (alignés backend). Coach omis : on ne maintient que mentor. */
export const ROLE_ADMIN = 'admin';
export const ROLE_STAFF = 'staff';
export const ROLE_MENTOR = 'mentor';

/**
 * Retourne les rôles de l'utilisateur (source unique, pas de normalisation coach → mentor).
 */
export function getRoles(user: IUser | null): string[] {
  return user?.roles ?? [];
}

/**
 * Indique si l'utilisateur a le rôle mentor (uniquement 'mentor', pas coach).
 */
export function hasMentorRole(user: IUser | null): boolean {
  return getRoles(user).includes(ROLE_MENTOR);
}
