import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { environment } from '@environments/environment';
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

    // Récupérer le returnUrl depuis les query params
    const returnUrl = this.#route.snapshot.queryParams['returnUrl'] || '/dashboard';

    this.store.signIn({
      payload: this.form.value,
      onSuccess: () => true,
      returnUrl
    });
  }

  signinWithGoogle(): void {
    window.location.replace(environment.apiUrl + 'auth/sign-in');
  }
}
