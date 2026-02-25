import { Component, inject, signal, ChangeDetectionStrategy, effect, computed } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';
import { IUser } from '@shared/models/entities.models';
import { DatePicker } from 'primeng/datepicker';
import { UpdateInfoStore } from '@features/dashboard/store/update-info.store';
import { UpdateInfoDto } from '@features/dashboard/dto/update-info.dto';
import { FileUpload } from '@shared/components/file-upload/file-upload';
import { ApiImgPipe } from '@shared/pipes';
import { FormManager } from '@shared/components/form-manager/form-manager';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, RouterModule, DatePicker, FileUpload, ApiImgPipe, FormManager],
  providers: [UpdateInfoStore],
  templateUrl: './profile.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePage {
  authStore = inject(AuthStore);
  updateInfoStore = inject(UpdateInfoStore);
  fb = inject(FormBuilder);
  router = inject(Router);

  isEditing = signal(false);
  isEditingInterests = signal(false);

  user = computed(() => this.authStore.user());
  hasMentorProfile = computed(() => !!this.user()?.mentor_profile);
  mentorStatus = computed(() => this.user()?.mentor_profile?.status || null);

  profileForm = this.fb.group({
    name: ['', Validators.required],
    biography: [''],
    phone_number: [''],
    city: [''],
    country: [''],
    gender: [''],
    birth_date: [null as Date | null]
  });

  constructor() {
    effect(() => {
      const user = this.user();
      if (user) {
        if (!this.isEditing()) {
          this.profileForm.patchValue(
            {
              name: user.name,
              biography: user.biography || '',
              phone_number: user.phone_number || '',
              city: user.city || '',
              country: user.country || '',
              gender: user.gender || '',
              birth_date: user.birth_date ? new Date(user.birth_date) : null
            },
            { emitEvent: false }
          );
          this.profileForm.disable();
        }
      }
    });
  }

  toggleEdit() {
    this.isEditing.update((v) => !v);
    if (this.isEditing()) {
      this.profileForm.enable();
    } else {
      this.profileForm.disable();
    }
  }

  getUploadUrl(): string {
    return 'users/me/profile-image';
  }

  handleLoaded(): void {
    this.authStore.getProfile();
  }

  saveProfile() {
    if (this.profileForm.invalid || !this.user()) return;

    const user = this.user()!;
    const formValue = this.profileForm.getRawValue();

    const payload: UpdateInfoDto = {
      email: user.email ?? '',
      address: (user as IUser & { address?: string }).address ?? '',
      phone_number: formValue.phone_number ?? '',
      gender: formValue.gender ?? '',
      name: formValue.name ?? user.name ?? '',
      birth_date: formValue.birth_date ? new Date(formValue.birth_date) : (user.birth_date ?? new Date()),
      country: formValue.country ?? '',
      city: formValue.city ?? '',
      biography: formValue.biography ?? ''
    };

    this.updateInfoStore.updateInfo(payload);

    this.isEditing.set(false);
    this.profileForm.disable();
  }

  cancelEdit() {
    this.isEditing.set(false);
    this.profileForm.disable();

    // Re-synchroniser avec les données actuelles du signal
    const user = this.user();
    if (user) {
      this.profileForm.patchValue({
        name: user.name,
        biography: user.biography || '',
        phone_number: user.phone_number || '',
        city: user.city || '',
        country: user.country || '',
        gender: user.gender || '',
        birth_date: user.birth_date ? new Date(user.birth_date) : null
      });
    }
  }

  applyAsMentor() {
    this.router.navigate(['/dashboard/mentor/apply']);
  }

  goToMentorDashboard() {
    this.router.navigate(['/dashboard/mentor']);
  }
}
