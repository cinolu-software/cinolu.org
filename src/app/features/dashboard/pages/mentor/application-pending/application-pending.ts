import { Component, ChangeDetectionStrategy, computed, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthStore } from '../../../../../core/auth/auth.store';
import { MentorApplicationState } from '@core/auth/mentor-application.state';
import { MentorProfileStore } from '../../../store/mentor-profile.store';
import { ToastrService } from '@core/services/toast/toastr.service';

@Component({
  selector: 'app-mentor-application-pending',
  imports: [RouterModule],
  templateUrl: './application-pending.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MentorApplicationPending implements OnInit {
  readonly authStore = inject(AuthStore);
  readonly mentorApplicationState = inject(MentorApplicationState);
  readonly mentorProfileStore = inject(MentorProfileStore);
  private readonly toast = inject(ToastrService);

  /**
   * Vrai si l'utilisateur a une candidature pending sans CV.
   * Lu depuis le store (mis à jour après uploadCV) et non depuis authStore.user()
   * pour réagir immédiatement après l'upload sans re-fetch.
   */
  readonly isCvMissing = computed(() => {
    const profile = this.mentorProfileStore.profile();
    return this.mentorApplicationState.isPending() && !profile?.cv;
  });

  ngOnInit(): void {
    this.mentorProfileStore.loadProfileFromMe();
  }

  handleCVUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const profileId = this.mentorProfileStore.profile()?.id;

    if (!profileId) {
      this.toast.showError('Profil mentor introuvable, veuillez réessayer');
      return;
    }
    if (file.type !== 'application/pdf') {
      this.toast.showError('Seuls les fichiers PDF sont acceptés');
      return;
    }
    if (file.size > 1 * 1024 * 1024) {
      this.toast.showError('Le fichier ne doit pas dépasser 1 MB');
      return;
    }

    this.mentorProfileStore.uploadCV({ id: profileId, file });
  }
}
