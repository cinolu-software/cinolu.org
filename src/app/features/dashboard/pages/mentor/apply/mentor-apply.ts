import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DatePicker } from 'primeng/datepicker';
import { AuthStore } from '@core/auth/auth.store';
import { MentorProfileStore } from '@features/dashboard/store/mentor-profile.store';
import { FormManager } from '@shared/components/form-manager/form-manager';
import { CreateExperienceDto } from '@shared/models';

@Component({
  selector: 'app-mentor-apply',
  imports: [ReactiveFormsModule, RouterModule, DatePicker, FormManager],
  templateUrl: './mentor-apply.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MentorApply implements OnInit {
  authStore = inject(AuthStore);
  mentorProfileStore = inject(MentorProfileStore);
  fb = inject(FormBuilder);
  router = inject(Router);

  currentStep = signal(1);
  maxSteps = 3;

  // Form Groups
  applicationForm = this.fb.group({
    years_experience: [0, [Validators.required, Validators.min(0)]],
    expertises: [[] as string[], Validators.required],
    experiences: this.fb.array([])
  });

  // Expertises disponibles (sera chargé depuis le store)
  availableExpertises = this.mentorProfileStore.expertises;

  ngOnInit() {
    // Charger les expertises disponibles
    this.mentorProfileStore.loadExpertises();

    // Vérifier si l'utilisateur a déjà un profil mentor
    const user = this.authStore.user();
    if (user?.mentor_profile) {
      // Si déjà mentor, rediriger vers le dashboard mentor
      this.router.navigate(['/dashboard/mentor']);
    }

    // Ajouter une expérience par défaut
    this.addExperience();
  }

  get experiences(): FormArray {
    return this.applicationForm.get('experiences') as FormArray;
  }

  createExperienceFormGroup() {
    const group = this.fb.group({
      company_name: ['', Validators.required],
      job_title: ['', Validators.required],
      is_current: [false],
      start_date: [null as Date | null, Validators.required],
      end_date: [null as Date | null]
    });

    // Écouter les changements de is_current pour activer/désactiver end_date
    group.get('is_current')?.valueChanges.subscribe((isCurrent) => {
      const endDateControl = group.get('end_date');
      if (isCurrent) {
        endDateControl?.disable();
        endDateControl?.setValue(null);
      } else {
        endDateControl?.enable();
      }
    });

    return group;
  }

  addExperience() {
    this.experiences.push(this.createExperienceFormGroup());
  }

  removeExperience(index: number) {
    if (this.experiences.length > 1) {
      this.experiences.removeAt(index);
    }
  }

  toggleExpertise(expertiseId: string) {
    const currentExpertises = this.applicationForm.get('expertises')?.value || [];
    const index = currentExpertises.indexOf(expertiseId);

    if (index > -1) {
      // Remove expertise
      currentExpertises.splice(index, 1);
    } else {
      // Add expertise
      currentExpertises.push(expertiseId);
    }

    this.applicationForm.patchValue({ expertises: currentExpertises });
  }

  isExpertiseSelected(expertiseId: string): boolean {
    const currentExpertises = this.applicationForm.get('expertises')?.value || [];
    return currentExpertises.includes(expertiseId);
  }

  nextStep() {
    if (this.currentStep() < this.maxSteps) {
      // Validation basée sur l'étape actuelle
      if (this.currentStep() === 1 && !this.applicationForm.get('years_experience')?.valid) {
        return;
      }
      if (
        this.currentStep() === 2 &&
        (!this.applicationForm.get('expertises')?.valid || this.applicationForm.get('expertises')?.value?.length === 0)
      ) {
        return;
      }
      this.currentStep.set(this.currentStep() + 1);
    }
  }

  previousStep() {
    if (this.currentStep() > 1) {
      this.currentStep.set(this.currentStep() - 1);
    }
  }

  submitApplication() {
    if (this.applicationForm.invalid) {
      console.warn('⚠️ Formulaire invalide:', this.applicationForm.errors);
      Object.keys(this.applicationForm.controls).forEach((key) => {
        const control = this.applicationForm.get(key);
        if (control?.invalid) {
          console.warn(`  - ${key}:`, control.errors);
        }
      });
      return;
    }

    // Utiliser getRawValue() pour obtenir les valeurs même des contrôles désactivés
    const formValue = this.applicationForm.getRawValue();

    interface ExperienceFormValue {
      company_name: string;
      job_title: string;
      is_current: boolean;
      start_date: Date | null;
      end_date?: Date | null;
    }

    const experiences: CreateExperienceDto[] = ((formValue.experiences as ExperienceFormValue[]) || [])
      .filter((exp) => exp.company_name && exp.job_title && exp.start_date) // Filtrer les expériences valides
      .map((exp: ExperienceFormValue) => {
        const experience: CreateExperienceDto = {
          company_name: exp.company_name.trim(),
          job_title: exp.job_title.trim(),
          is_current: exp.is_current || false,
          start_date: exp.start_date instanceof Date ? exp.start_date.toISOString() : exp.start_date!,
          end_date: exp.is_current
            ? null
            : exp.end_date instanceof Date
              ? exp.end_date.toISOString()
              : exp.end_date || null
        };
        return experience;
      });

    const payload = {
      years_experience: Number(formValue.years_experience) || 0,
      expertises: (formValue.expertises || []).filter((id) => id && id.trim()),
      experiences
    };

    console.log("📤 Payload envoyé à l'API:", JSON.stringify(payload, null, 2));
    console.log('🔍 Types:', {
      years_experience: typeof payload.years_experience,
      expertises: Array.isArray(payload.expertises),
      expertises_count: payload.expertises.length,
      experiences_count: payload.experiences.length,
      first_experience: payload.experiences[0]
    });

    this.mentorProfileStore.createProfile({
      data: payload,
      onSuccess: () => {
        // Rafraîchir le profil utilisateur pour obtenir le mentor_profile
        this.authStore.getProfile();
        // Rediriger vers la page d'attente d'approbation
        this.router.navigate(['/dashboard/mentor/application-pending']);
      }
    });
  }

  getProgressPercentage(): number {
    return (this.currentStep() / this.maxSteps) * 100;
  }
}
