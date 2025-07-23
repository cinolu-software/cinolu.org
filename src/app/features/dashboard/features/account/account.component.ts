import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LucideAngularModule, Info, Lock } from 'lucide-angular';
import { UpdateInfoStore } from '../../data-access/account/update-info.store';
import { UpdatePasswordStore } from '../../data-access/account/update-password.store';
import { environment } from '../../../../../environments/environment';
import { AuthStore } from '../../../../core/store/auth.store';
import { FileUploadComponent } from '../../../../shared/components/file-upload/file-upload.component';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';

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
    LucideAngularModule
  ]
})
export class AccountComponent implements OnInit {
  infoForm: FormGroup;
  passwordForm: FormGroup;
  accUrl = environment.accountUrl;
  url = environment.apiUrl + 'users/image-profile';
  #formBuilder = inject(FormBuilder);
  store = inject(AuthStore);
  infoStore = inject(UpdateInfoStore);
  passwordStore = inject(UpdatePasswordStore);
  tabs = signal([
    { name: 'info', icon: Info, label: 'Mes informations' },
    { name: 'password', icon: Lock, label: 'Mon mot de passe' }
  ]);
  activeTab = signal('info');

  constructor() {
    this.infoForm = this.#formBuilder.group({
      email: ['', Validators.email],
      address: ['', [Validators.required, Validators.minLength(3)]],
      phone_number: ['', [Validators.minLength(10), Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      name: ['', Validators.minLength(3)]
    });
    this.passwordForm = this.#formBuilder.group({
      password: ['', [Validators.minLength(6), Validators.required]],
      password_confirm: ['', [Validators.minLength(6), Validators.required]]
    });
  }

  ngOnInit(): void {
    this.infoForm.patchValue({
      email: this.store.user()?.email,
      address: this.store.user()?.address,
      phone_number: this.store.user()?.phone_number,
      name: this.store.user()?.name
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
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
