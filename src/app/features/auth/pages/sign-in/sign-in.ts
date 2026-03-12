import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '@environments/environment';
import { validateReturnUrl } from '@core/auth/auth-redirect.util';
import { AuthStore } from '@core/auth/auth.store';
import { AuthCard } from '../../components/auth-card/auth-card';
import { SignInStore } from '../../store/sign-in.store';
import { ButtonComponent } from '@shared/ui';
import { LucideAngularModule, Mail, Lock, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { FormManager } from '@shared/components/form-manager/form-manager';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.html',
  providers: [SignInStore],
  imports: [
    RouterLink,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    CommonModule,
    AuthCard,
    FormManager,
    LucideAngularModule,
    TranslateModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignIn {
  #formBuilder: FormBuilder = inject(FormBuilder);
  #route = inject(ActivatedRoute);
  #authStore = inject(AuthStore);
  form: FormGroup;
  store = inject(SignInStore);

  icons = {
    mail: Mail,
    lock: Lock,
    alertCircle: AlertCircle,
    arrowRight: ArrowRight,
    eye: Eye,
    eyeOff: EyeOff
  };
  showPassword = signal(false);

  constructor() {
    this.form = this.#formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSignIn(): void {
    if (this.form.invalid) return;

    const returnUrl = validateReturnUrl(this.#route.snapshot.queryParams['returnUrl']);

    this.store.signIn({
      payload: this.form.value,
      onSuccess: () => undefined,
      returnUrl
    });
  }

  signinWithGoogle(): void {
    const returnUrl = validateReturnUrl(this.#route.snapshot.queryParams['returnUrl']);
    this.#authStore.setRedirectUrl(returnUrl);
    window.location.replace(environment.apiUrl + 'auth/google');
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value);
  }
}
