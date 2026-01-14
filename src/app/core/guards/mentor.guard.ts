import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthStore } from '../auth/auth.store';
import { IRole, MentorStatus } from '@shared/models';

export const mentorGuard: CanActivateFn = (state) => {
  const auth = inject(AuthStore);
  const router = inject(Router);

  const user = auth.user();

  if (!user) {
    router.navigate(['/sign-in'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  const isMentor = user.roles?.includes('mentor' as unknown as IRole);

  if (!isMentor) {
    router.navigate(['/dashboard'], {
      queryParams: { error: 'access-denied', message: 'Accès réservé aux mentors' }
    });
    return false;
  }

  const mentorProfile = user.mentor_profile;

  if (!mentorProfile) {
    router.navigate(['/dashboard'], {
      queryParams: { error: 'no-mentor-profile', message: 'Profil mentor introuvable' }
    });
    return false;
  }

  if (mentorProfile.status !== MentorStatus.APPROVED) {
    if (mentorProfile.status === MentorStatus.PENDING) {
      router.navigate(['/dashboard/mentor/application-pending']);
      return false;
    }

    if (mentorProfile.status === MentorStatus.REJECTED) {
      router.navigate(['/dashboard/mentor/application-rejected']);
      return false;
    }
  }
  return true;
};
