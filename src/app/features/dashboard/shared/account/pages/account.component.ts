import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LucideAngularModule } from 'lucide-angular';
import { UpdateInfoStore } from '../store/update-info.store';
import { UpdatePasswordStore } from '../store/update-password.store';
import { DatePickerModule } from 'primeng/datepicker';
import { environment } from '../../../../../../environments/environment';
import { AuthStore } from '../../../../../core/auth/auth.store';
import { FileUploadComponent } from '../../../../../shared/components/file-upload/file-upload.component';
import { ApiImgPipe } from '../../../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  providers: [UpdateInfoStore, UpdatePasswordStore],
  imports: [
    ButtonModule,
    NgOptimizedImage,
    InputTextModule,
    CommonModule,
    ReactiveFormsModule,
    FileUploadComponent,
    ApiImgPipe,
    DatePickerModule,
    LucideAngularModule,
  ],
})
export class AccountComponent implements OnInit {
  infoForm: FormGroup;
  passwordForm: FormGroup;
  url = environment.apiUrl + 'users/image-profile';
  #formBuilder = inject(FormBuilder);
  store = inject(AuthStore);
  infoStore = inject(UpdateInfoStore);
  passwordStore = inject(UpdatePasswordStore);

  constructor() {
    this.infoForm = this.#formBuilder.group({
      email: ['', Validators.email],
      city: ['', Validators.required],
      country: ['', Validators.required],
      birth_date: ['', Validators.required],
      phone_number: ['', [Validators.minLength(10)]],
      name: ['', Validators.minLength(3)],
    });
    this.passwordForm = this.#formBuilder.group({
      password: ['', [Validators.minLength(6), Validators.required]],
      password_confirm: ['', [Validators.minLength(6), Validators.required]],
    });
  }

  ngOnInit(): void {
    const user = this.store.user();
    if (!user) return;
    this.infoForm.patchValue({
      ...user,
      birth_date: user.birth_date && new Date(user.birth_date),
    });
  }

  handleLoaded(): void {
    this.store.getProfile();
  }

  onUpdateInfo(): void {
    if (!this.infoForm.valid) return;
    this.infoStore.updateInfo(this.infoForm.value);
  }

  onUpdatePassword(): void {
    if (!this.passwordForm.valid) return;
    this.passwordStore.updatePassword(this.passwordForm.value);
  }
}
