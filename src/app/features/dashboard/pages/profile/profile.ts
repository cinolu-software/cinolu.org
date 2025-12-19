import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthStore } from '@core/auth/auth.store';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from '@core/services/toast/toastr.service';
import { IUser } from '@shared/models/entities.models';
import { DatePicker } from 'primeng/datepicker';
import { UpdateInfoStore } from '@features/dashboard/store/update-info.store';
import { UpdateInfoDto } from '@features/dashboard/dto/update-info.dto';
import { FileUpload } from '@shared/components/file-upload/file-upload';
import { ApiImgPipe } from '@shared/pipes';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePicker, FileUpload, ApiImgPipe],
  providers: [UpdateInfoStore],
  templateUrl: './profile.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePage implements OnInit {
  authStore = inject(AuthStore);
  updateInfoStore = inject(UpdateInfoStore);
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  toast = inject(ToastrService);

  isEditing = signal(false);
  selectedFile = signal<File | null>(null);

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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile.set(input.files[0]);
      this.uploadProfilePicture();
    }
  }

  getUploadUrl(): string {
    const userId = this.authStore.user()?.id;
    return userId ? `users/${userId}/profile-picture` : '';
  }

  handleLoaded(): void {
    // Recharger le profil utilisateur pour afficher la nouvelle image
    this.authStore.getProfile();
  }

  uploadProfilePicture() {
    const file = this.selectedFile();
    const userId = this.authStore.user()?.id;

    if (!file || !userId) return;

    const formData = new FormData();
    formData.append('file', file);
    this.http.post<IUser>(`users/${userId}/profile-picture`, formData).subscribe({
      next: (updatedUser) => {
        this.authStore.setUser(updatedUser);
        this.toast.showSuccess('Photo de profil mise à jour');
      },
      error: (err) => {
        this.toast.showError(err.error?.message || "Erreur lors de l'upload");
      }
    });
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
}
