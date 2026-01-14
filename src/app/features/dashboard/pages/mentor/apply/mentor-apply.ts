import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DatePicker } from 'primeng/datepicker';
import { AuthStore } from '@core/auth/auth.store';
import { MentorProfileStore } from '@features/dashboard/store/mentor-profile.store';
import { FormManager } from '@shared/components/form-manager/form-manager';
import { CreateExperienceDto } from '@shared/models';

@Component({
  selector: 'app-mentor-apply',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, DatePicker, FormManager],
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
    return this.fb.group({
      company_name: ['', Validators.required],
      job_title: ['', Validators.required],
      is_current: [false],
      start_date: [null as Date | null, Validators.required],
      end_date: [null as Date | null]
    });
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
      return;
    }

    const formValue = this.applicationForm.value;

    interface ExperienceFormValue {
      company_name: string;
      job_title: string;
      is_current: boolean;
      start_date: Date | null;
      end_date?: Date | null;
    }

    const experiences: CreateExperienceDto[] = ((formValue.experiences as ExperienceFormValue[]) || []).map(
      (exp: ExperienceFormValue) => ({
        company_name: exp.company_name,
        job_title: exp.job_title,
        is_current: exp.is_current,
        start_date: exp.start_date!,
        end_date: exp.is_current ? null : exp.end_date || null
      })
    );

    const payload = {
      years_experience: formValue.years_experience || 0,
      expertises: formValue.expertises || [],
      experiences
    };

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
