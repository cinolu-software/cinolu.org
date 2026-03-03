import { Injectable } from '@angular/core';
import { getRoles, hasMentorRole, ROLE_ADMIN, ROLE_MENTOR, ROLE_STAFF } from './role.util';
import type { IUser } from '@shared/models';
import { MentorStatus } from '@shared/models';

export type MentorRedirectReason = 'pending' | 'rejected' | null;

@Injectable({
  providedIn: 'root'
})
export class RightsService {

  /** Rôles de l'utilisateur (alias getRoles, mentor uniquement, pas coach). */
  getRoles(user: IUser | null): string[] {
    return getRoles(user);
  }

  /** Vérifie la présence d'un rôle (strings backend). */
  hasRole(user: IUser | null, role: string): boolean {
    return getRoles(user).includes(role);
  }

  /** Accès à l'espace mentor : rôle mentor + profil présent + status APPROVED. */
  canAccessMentorArea(user: IUser | null): boolean {
    if (!user || !hasMentorRole(user)) return false;
    const profile = user.mentor_profile;
    return !!profile && profile.status === MentorStatus.APPROVED;
  }

  /** Visibilité du menu "Espace Mentor" (alignée sur l'accès route). */
  canSeeMentorMenu(user: IUser | null): boolean {
    return this.canAccessMentorArea(user);
  }

  /** Raison de redirection si rôle mentor + profil mais pas APPROVED. */
  getMentorRedirectReason(user: IUser | null): MentorRedirectReason {
    if (!user || !hasMentorRole(user) || !user.mentor_profile) return null;
    const status = user.mentor_profile.status;
    if (status === MentorStatus.PENDING) return 'pending';
    if (status === MentorStatus.REJECTED) return 'rejected';
    return null;
  }

  /** Admin ou staff (affichage bandeau overview, etc.). */
  isAdminOrStaff(user: IUser | null): boolean {
    const roles = getRoles(user);
    return roles.includes(ROLE_ADMIN) || roles.includes(ROLE_STAFF);
  }

  /** Libellé affiché pour le rôle (header, menu user). */
  getRoleLabel(user: IUser | null): string {
    if (!user || !user.roles?.length) return 'Entrepreneur';
    if (this.hasRole(user, ROLE_ADMIN)) return 'Administrateur';
    if (this.hasRole(user, ROLE_MENTOR)) return 'Mentor';
    return 'Entrepreneur';
  }

  /**
   * Route de landing dashboard selon le rôle et le statut mentor.
   * - Admin → /dashboard/user (pas de dashboard admin interne)
   * - Mentor APPROVED → /dashboard/mentor
   * - Mentor PENDING → /dashboard/user/mentor/application-pending
   * - Mentor REJECTED → /dashboard/user/mentor/application-rejected
   * - User → /dashboard/user
   */
  resolveLandingRoute(user: IUser | null): string {
    if (!user) return '/dashboard/user';
    const reason = this.getMentorRedirectReason(user);
    if (reason === 'pending') return '/dashboard/user/mentor/application-pending';
    if (reason === 'rejected') return '/dashboard/user/mentor/application-rejected';
    if (this.canAccessMentorArea(user)) return '/dashboard/mentor';
    return '/dashboard/user';
  }
}
