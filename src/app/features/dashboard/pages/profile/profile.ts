import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';
import { IUser, MentorStatus } from '@shared/models/entities.models';
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
export class ProfilePage implements OnInit {
  authStore = inject(AuthStore);
  updateInfoStore = inject(UpdateInfoStore);
  fb = inject(FormBuilder);
  router = inject(Router);

  isEditing = signal(false);

  profileForm = this.fb.group({
    name: ['', Validators.required],
    biography: [''],
    phone_number: [''],
    city: [''],
    country: [''],
    gender: [''],
    birth_date: [null as Date | null]
  });

  ngOnInit() {
    const user = this.authStore.user();
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
      this.profileForm.disable();
    }
  }

  toggleEdit() {
    const newState = !this.isEditing();
    this.isEditing.set(newState);

    if (newState) {
      this.profileForm.enable();
    } else {
      this.profileForm.disable();
    }
  }

  getUploadUrl(): string {
    return 'users/image-profile';
  }

  handleLoaded(): void {
    this.authStore.getProfile();
  }

  saveProfile() {
    if (this.profileForm.invalid) return;

    const current = this.authStore.user();
    if (!current) return;

    const fv = this.profileForm.value;
    type WithAddress = IUser & { address?: string };
    const address = (current as WithAddress).address ?? '';
    const birthDate: Date = fv.birth_date ? new Date(fv.birth_date) : (current.birth_date ?? new Date());

    const payload: UpdateInfoDto = {
      email: current.email ?? '',
      address: address,
      phone_number: fv.phone_number ?? '',
      name: fv.name ?? current.name ?? '',
      birth_date: birthDate,
      country: fv.country ?? '',
      city: fv.city ?? '',
      biography: fv.biography ?? '',
      gender: fv.gender ?? ''
    };

    this.updateInfoStore.updateInfo(payload);
    this.isEditing.set(false);
    this.profileForm.disable();
  }

  cancelEdit() {
    this.isEditing.set(false);
    this.profileForm.disable();
    this.ngOnInit();
  }

  // Vérifier si l'utilisateur est déjà mentor
  isMentor(): boolean {
    const user = this.authStore.user();
    return !!user?.roles?.some((role) => role.name === 'mentor');
  }

  // Vérifier si l'utilisateur a un profil mentor
  hasMentorProfile(): boolean {
    return !!this.authStore.user()?.mentor_profile;
  }

  // Obtenir le statut du profil mentor
  getMentorStatus(): MentorStatus | null {
    return this.authStore.user()?.mentor_profile?.status || null;
  }

  // Naviguer vers la page de candidature mentor
  applyAsMentor() {
    this.router.navigate(['/dashboard/mentor/apply']);
  }

  // Naviguer vers le dashboard mentor
  goToMentorDashboard() {
    this.router.navigate(['/dashboard/mentor']);
  }
}
