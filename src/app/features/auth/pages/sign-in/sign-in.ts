import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { environment } from '@environments/environment';
import { validateReturnUrl } from '@core/auth/auth-redirect.util';
import { AuthStore } from '@core/auth/auth.store';
import { AuthCard } from '../../components/auth-card/auth-card';
import { SignInStore } from '../../store/sign-in.store';
import { Password } from 'primeng/password';
import { LucideAngularModule, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { FormManager } from '@shared/components/form-manager/form-manager';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.html',
  providers: [SignInStore],
  imports: [
    RouterLink,
    InputTextModule,
    Password,
    ButtonModule,
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
    arrowRight: ArrowRight
  };

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
}
