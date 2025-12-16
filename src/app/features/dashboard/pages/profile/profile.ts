import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthStore } from '@core/auth/auth.store';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from '@core/services/toast/toastr.service';
import { IUser } from '@shared/models/entities.models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html'
})
export class ProfilePage implements OnInit {
  authStore = inject(AuthStore);
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  toast = inject(ToastrService);

  isEditing = signal(false);
  isLoading = signal(false);
  selectedFile = signal<File | null>(null);

  profileForm = this.fb.group({
    name: ['', Validators.required],
    biography: [''],
    phone_number: [''],
    city: [''],
    country: [''],
    gender: [''],
    birth_date: ['']
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
        birth_date: user.birth_date ? new Date(user.birth_date).toISOString().split('T')[0] : ''
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

  uploadProfilePicture() {
    const file = this.selectedFile();
    const userId = this.authStore.user()?.id;

    if (!file || !userId) return;

    const formData = new FormData();
    formData.append('file', file);

    this.isLoading.set(true);
    this.http.post<IUser>(`users/${userId}/profile-picture`, formData).subscribe({
      next: (updatedUser) => {
        this.authStore.setUser(updatedUser);
        this.toast.showSuccess('Photo de profil mise à jour');
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toast.showError(err.error?.message || "Erreur lors de l'upload");
        this.isLoading.set(false);
      }
    });
  }

  saveProfile() {
    if (this.profileForm.invalid) return;

    this.isLoading.set(true);
    this.http.patch<IUser>('auth/profile', this.profileForm.value).subscribe({
      next: (updatedUser) => {
        this.authStore.setUser(updatedUser);
        this.toast.showSuccess('Profil mis à jour');
        this.isEditing.set(false);
        this.profileForm.disable();
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toast.showError(err.error?.message || 'Erreur lors de la mise à jour');
        this.isLoading.set(false);
      }
    });
  }

  cancelEdit() {
    this.isEditing.set(false);
    this.profileForm.disable();
    this.ngOnInit();
  }
}
