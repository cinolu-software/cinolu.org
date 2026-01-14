import { Component, inject, OnInit, signal, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';
import { MentorProfileStore } from '../../../store/mentor-profile.store';
import { CreateExperienceDto, IExpertise, IExperience, IMentorProfile } from '@shared/models';
import { ToastrService } from '@core/services/toast/toastr.service';

@Component({
  selector: 'app-mentor-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mentor-profile.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MentorProfile implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private toast = inject(ToastrService);

  authStore = inject(AuthStore);
  profileStore = inject(MentorProfileStore);

  isEditMode = signal(false);
  selectedExpertises = signal<string[]>([]);

  profileForm = this.fb.group({
    years_experience: [0, [Validators.required, Validators.min(0)]],
    expertises: [[] as string[]],
    experiences: this.fb.array([])
  });

  constructor() {
    // Charger les expertises disponibles
    this.profileStore.loadExpertises();

    effect(() => {
      const profile = this.profileStore.profile();
      if (profile && !this.isEditMode()) {
        this.populateForm(profile);
      }
    });
  }

  ngOnInit(): void {
    // Charger le profil depuis AuthStore
    this.authStore.getProfile();

    // Synchroniser le profil dans le store local
    setTimeout(() => {
      this.profileStore.loadProfileFromAuth();
    }, 100);
  }

  get experiencesArray(): FormArray {
    return this.profileForm.get('experiences') as FormArray;
  }

  populateForm(profile: IMentorProfile): void {
    // Remplir les expertises
    const expertiseIds = profile.expertises?.map((exp: IExpertise) => exp.id) || [];
    this.selectedExpertises.set(expertiseIds);

    this.profileForm.patchValue(
      {
        years_experience: profile.years_experience || 0,
        expertises: expertiseIds
      },
      { emitEvent: false }
    );

    this.experiencesArray.clear();
    if (profile.experiences && profile.experiences.length > 0) {
      profile.experiences.forEach((exp: IExperience) => {
        this.experiencesArray.push(this.createExperienceFormGroup(exp));
      });
    }
  }

  createExperienceFormGroup(experience?: Partial<IExperience>) {
    const isCurrent = experience?.is_current || false;
    const group = this.fb.group({
      id: [experience?.id || null],
      company_name: [experience?.company_name || '', Validators.required],
      job_title: [experience?.job_title || '', Validators.required],
      start_date: [
        experience?.start_date ? new Date(experience.start_date).toISOString().split('T')[0] : '',
        Validators.required
      ],
      end_date: [
        {
          value: experience?.end_date ? new Date(experience.end_date).toISOString().split('T')[0] : null,
          disabled: isCurrent
        }
      ],
      is_current: [isCurrent]
    });
    return group;
  }

  addExperience(): void {
    this.experiencesArray.push(this.createExperienceFormGroup());
  }

  removeExperience(index: number): void {
    this.experiencesArray.removeAt(index);
  }

  toggleExpertise(expertiseId: string): void {
    const current = this.selectedExpertises();
    if (current.includes(expertiseId)) {
      this.selectedExpertises.set(current.filter((id) => id !== expertiseId));
    } else {
      this.selectedExpertises.set([...current, expertiseId]);
    }
    this.profileForm.patchValue({ expertises: this.selectedExpertises() });
  }

  isExpertiseSelected(expertiseId: string): boolean {
    return this.selectedExpertises().includes(expertiseId);
  }

  toggleCurrentPosition(index: number): void {
    const experienceGroup = this.experiencesArray.at(index);
    const endDateControl = experienceGroup.get('end_date');
    const isCurrent = experienceGroup.get('is_current')?.value;

    if (isCurrent) {
      // Si c'est le poste actuel, effacer la date de fin et désactiver le champ
      experienceGroup.patchValue({ end_date: null });
      endDateControl?.disable();
    } else {
      // Si ce n'est plus le poste actuel, réactiver le champ
      endDateControl?.enable();
    }
  }

  enableEditMode(): void {
    this.isEditMode.set(true);
    this.experiencesArray.controls.forEach((control) => {
      const isCurrent = control.get('is_current')?.value;
      const endDateControl = control.get('end_date');
      if (isCurrent) {
        endDateControl?.disable();
      } else {
        endDateControl?.enable();
      }
    });
  }

  cancelEdit(): void {
    this.isEditMode.set(false);
    const profile = this.profileStore.profile();
    if (profile) {
      this.populateForm(profile);
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      this.toast.showError('Veuillez remplir tous les champs requis');
      return;
    }

    const user = this.authStore.user();
    const profileId = user?.mentor_profile?.id;

    if (!profileId) {
      this.toast.showError('Profil mentor non trouvé');
      return;
    }

    const formValue = this.profileForm.getRawValue();
    const experiences: CreateExperienceDto[] = (
      (formValue.experiences || []) as {
        id?: string;
        company_name: string;
        job_title: string;
        start_date: string;
        end_date?: string | null;
        is_current: boolean;
      }[]
    ).map((exp) => ({
      id: exp.id,
      company_name: exp.company_name,
      job_title: exp.job_title,
      start_date: exp.start_date,
      end_date: exp.is_current ? null : exp.end_date,
      is_current: exp.is_current
    }));

    const updateDto = {
      years_experience: formValue.years_experience || 0,
      expertises: formValue.expertises || [],
      experiences: experiences
    };

    this.profileStore.updateProfile({
      id: profileId,
      dto: updateDto
    });
    setTimeout(() => {
      this.authStore.getProfile();
      this.isEditMode.set(false);
    }, 500);
  }

  handleCVUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const user = this.authStore.user();
    const profileId = user?.mentor_profile?.id;

    if (!profileId) {
      this.toast.showError('Profil mentor non trouvé');
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

    this.profileStore.uploadCV({ id: profileId, file });

    // Recharger le profil après l'upload
    setTimeout(() => {
      this.authStore.getProfile();
    }, 1000);
  }

  getStatusBadgeClass(): string {
    const profile = this.profileStore.profile();
    if (!profile) return '';

    switch (profile.status) {
      case 'approved':
        return 'dashboard-badge-success';
      case 'pending':
        return 'dashboard-badge-warning';
      case 'rejected':
        return 'dashboard-badge-danger';
      default:
        return 'dashboard-badge-neutral';
    }
  }

  getStatusLabel(): string {
    const profile = this.profileStore.profile();
    if (!profile) return '';

    switch (profile.status) {
      case 'approved':
        return 'Approuvé';
      case 'pending':
        return 'En attente';
      case 'rejected':
        return 'Rejeté';
      default:
        return '';
    }
  }

  getStatusIcon(): string {
    const profile = this.profileStore.profile();
    if (!profile) return '';

    switch (profile.status) {
      case 'approved':
        return 'verified';
      case 'pending':
        return 'schedule';
      case 'rejected':
        return 'cancel';
      default:
        return 'info';
    }
  }
}
