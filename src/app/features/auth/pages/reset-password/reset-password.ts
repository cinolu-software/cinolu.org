import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthCard } from '../../components/auth-card/auth-card';
import { ResetPasswordStore } from '../../store/reset-password.store';
import { ButtonComponent } from '@shared/ui';
import { LucideAngularModule, Lock, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { FormManager } from '@shared/components/form-manager/form-manager';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.html',
  providers: [ResetPasswordStore],
  imports: [
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    ButtonComponent,
    CommonModule,
    AuthCard,
    FormManager,
    LucideAngularModule,
    TranslateModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPassword {
  #token = inject(ActivatedRoute).snapshot.queryParams['token'];
  #formBuilder = inject(FormBuilder);
  form: FormGroup;
  store = inject(ResetPasswordStore);

  icons = {
    lock: Lock,
    alertCircle: AlertCircle,
    arrowRight: ArrowRight,
    eye: Eye,
    eyeOff: EyeOff
  };
  showPassword = signal(false);
  showPasswordConfirm = signal(false);

  constructor() {
    this.form = this.#formBuilder.group({
      password: ['', Validators.required],
      password_confirm: ['', Validators.required]
    });
  }

  onResetPassword(): void {
    if (this.form.invalid) return;
    this.form.disable();
    const { password, password_confirm } = this.form.value;
    const payload = { token: this.#token, password, password_confirm };
    this.store.resetPassword(payload);
    this.form.enable();
  }

  togglePasswordVisibility(field: 'password' | 'passwordConfirm'): void {
    if (field === 'password') {
      this.showPassword.update((value) => !value);
      return;
    }

    this.showPasswordConfirm.update((value) => !value);
  }
}
